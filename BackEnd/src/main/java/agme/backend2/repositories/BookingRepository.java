package agme.backend2.repositories;

import org.springframework.stereotype.Repository;

import agme.backend2.models.Booking;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

@Repository
public interface BookingRepository extends CrudRepository<Booking, Long> {
	
	void deleteByBookingId(Integer bookingId);
	
	@Query("select b from Booking b where b.bookingId = ?1")
	Booking findByBookingId(Integer bookingId);
	
	@Query("select b from Booking b where b.workerId = ?1 and b.done = ?2 order by stringDate, timeslot")
	List<Booking> findByWorkerIdAndDone(Integer workerId, boolean done);
	
	@Query("select b from Booking b where b.customerId = ?1 and b.done = ?2 order by stringDate, timeslot")
	List<Booking> findByCustomerIdAndDone(Integer customerId, boolean done);
	
	@Query("select b from Booking b where b.adminId = ?1 and b.done = ?2 order by stringDate, timeslot")
	List<Booking> findByAdminIdAndDone(Integer adminId, boolean done);
	
	@Query("select b.stringDate from Booking b where b.bookingId = ?1")
	String getStringDateByBookingId(Integer bookingId);

	@Query("select b from Booking b where b.timeslotId = ?1")
	Booking findByTimeslotId(Integer timeslotId);

	@Query("select b.timeslotId from Booking b where b.bookingId = ?1")
	Integer findTimeslotIdByBookingId(Integer bookingId);
	
}
