package agme.backend2.repositories;

import org.springframework.stereotype.Repository;

import agme.backend2.models.Timeslot;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

@Repository
public interface TimeslotRepository extends CrudRepository<Timeslot, Long> {

	Date findDateByTimeslotId(Integer timeslotId);

	@Query("select t.timeslotId from Timeslot t where t.workerId = ?1 and t.timeslot = ?2 and t.stringDate = ?3")
	Integer findTimeslotIdByWorkerIdAndTimeslotAndStringDate(Integer workerId, String timeslot, String stringDate);
	
	@Query("select t.timeslotId from Timeslot t where t.workerId = ?1 and t.stringDate = ?2")
	List<Integer> findTimeslotIdByWorkerIdAndStringDate(Integer workerId, String stringDate);

	@Query("select t from Timeslot t where t.workerId = ?1 and t.booked = ?2")
	List<Timeslot> findByWorkerIdAndBooked(Integer workerId, boolean booked);

	Timeslot findByTimeslotId(Integer timeslotId);
	
	void deleteByTimeslotId(Integer timeslotId);
	
}