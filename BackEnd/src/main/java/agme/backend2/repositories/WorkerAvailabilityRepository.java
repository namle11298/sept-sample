
package agme.backend2.repositories;

import org.springframework.stereotype.Repository;

import agme.backend2.models.WorkerAvailability;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

@Repository
public interface WorkerAvailabilityRepository extends CrudRepository<WorkerAvailability, Long> {

	@Query("select wa from WorkerAvailability wa where wa.userId = ?1 and wa.timeslot = ?2")
	WorkerAvailability findByUserIdAndName (Integer userId, String timeslot);
	
	@Query("select wa.status from WorkerAvailability wa where wa.userId = ?1 and wa.timeslot = ?2")
	String findStatusByUserIdAndName (Integer userId, String timeslot);
}
