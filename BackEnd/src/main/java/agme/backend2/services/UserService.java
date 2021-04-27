package agme.backend2.services;

import java.text.ParseException;
import java.util.Date;
import java.util.List;

import agme.backend2.models.*;


public interface UserService  {
	User registerCustomer(String firstName, String lastName, String username, String password, String confirmPassword,
			String address, String phone, String role);
	
	User registerAdmin(String firstName, String lastName, String username, String password, String confirmPassword,
			String company, String address, String phone, String role);
	
	User registerWorker(String firstName, String lastName, String username, String password, String confirmPassword,
			String address, String phone, String role, Integer adminId);
	
	User validateUser(String username, String password);

	String getName(Integer userId);
	
	String getAvailability(String username, String timeslot);
	
	void setAvailability(String username, String timeslot, String availability);
		
	List<Timeslot> getShifts(Integer workerId);
	
	void setShifts(Integer workerId, String date) throws ParseException;
	
	void deleteShifts(Integer workerId, String date);
	
	String getService(Integer adminId, String service);
	
	List<String> getAllServices(Integer adminId);
		
	void setService(Integer adminId, String service, String availability, String description);
	
	void deleteAll();
	
	Integer getAdminId(String company);
	
	List<AdminCompany> getAllCompanies();
	
	String getDescription(Integer adminId, String service);
	
	List<User> getWorkerOnDate(Integer adminId, String date);
	
	List<Booking> getBookings(Integer userId, boolean done);
	
	Booking createBooking(Integer workerId, Integer customerId, String timeslot, String date, String serviceName) throws ParseException;
	
	void cancelBooking(Integer bookingId) throws ParseException;

	void finishBooking(Integer bookingId);

	AuthenticationResponse createAuthenticationToken(String email, String password) throws Exception;
	
	Contact getContact(Integer userId);

	Contact setContact(Integer userId, String phone, String email, String detail);
}
