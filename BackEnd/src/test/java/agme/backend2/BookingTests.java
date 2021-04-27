package agme.backend2;

import static org.junit.jupiter.api.Assertions.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import agme.backend2.exceptions.ValidationException;
import agme.backend2.models.Booking;
import agme.backend2.models.Timeslot;
import agme.backend2.models.User;
import agme.backend2.services.UserService;

@SpringBootTest
class BookingTests {
	
	@Autowired
    UserService userService;
	
	User validAdmin;
	User validWorker;
	User validCustomer;
	
	ObjectMapper mapper = new ObjectMapper();

	SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
	
	Date currentDate;
	String testDate;
	
	@BeforeEach
	void init() throws ParseException {
		currentDate = new Date();
		testDate = formatter.format(currentDate.getTime() +(4 * 86400000));
		userService.registerAdmin("adminFirstName","adminLastName","adminUsername","adminPassword","adminPassword","adminCompany","adminAddress","adminPhone","admin");
    	validAdmin = userService.validateUser("adminUsername", "adminPassword");
    	userService.registerWorker("workerFirstName", "workerLastName", "workerUsername", "workerPassword", "workerPassword", "workerAddress", "workerPhone",
				"worker", validAdmin.getUserId());
    	validWorker = userService.validateUser("workerUsername", "workerPassword");
    	userService.registerCustomer("fname", "lname", "customerUsername", "customerPassword", "customerPassword", "customerAddress", "customerPhone", "Customer");
    	validCustomer = userService.validateUser("customerUsername", "customerPassword");
    	userService.setAvailability("workerUsername", "Monday", "Available");
    	userService.setShifts(validWorker.getUserId(), testDate);
	}
	
	@AfterEach
	void clearRepository() {
		userService.deleteAll();
	}
	
	//Checks if creating a booking does not calls an exception
	@Test
	void createBooking() throws ParseException {
    	userService.createBooking(validWorker.getUserId(), validCustomer.getUserId(), "9-10", testDate, "Baking");
		
	}
	
	//Checks if creating two bookings for the same timeslot calls an exception
	@Test
	void createBookingMultipleTimeslot() throws ParseException {
    	userService.createBooking(validWorker.getUserId(), validCustomer.getUserId(), "9-10", testDate, "Baking");
		Assertions.assertThrows(ValidationException.class, () -> {
			userService.createBooking(validWorker.getUserId(), validCustomer.getUserId(), "9-10", testDate, "Eating");
		});		
	}
	
	//Checks if creating a booking in the past calls an exception
	@Test
	void createBookingBeforeToday() throws ParseException {
		String newDate = formatter.format(currentDate.getTime() - (1 * 86400000));
		Assertions.assertThrows(ValidationException.class, () -> {
			userService.createBooking(validWorker.getUserId(), validCustomer.getUserId(), "9-10", newDate, "Eating");
		});		
	}
	
	//Checks if getting a worker booking returns the correct result
	@Test
	void getBookingWorker() throws ParseException, JsonProcessingException {
		Booking booking = userService.createBooking(validWorker.getUserId(), validCustomer.getUserId(), "9-10", testDate, "Baking");
    	List<Booking> bookings = userService.getBookings(validWorker.getUserId(), false);

    	assertEquals(booking.getBookingId(), bookings.get(0).getBookingId());
	}
	
	//Checks if getting a customer booking returns the correct result
	@Test
	void getBookingCustomer() throws ParseException, JsonProcessingException {
		Booking booking = userService.createBooking(validWorker.getUserId(), validCustomer.getUserId(), "9-10", testDate, "Baking");
    	List<Booking> bookings = userService.getBookings(validCustomer.getUserId(), false);

    	assertEquals(booking.getBookingId(), bookings.get(0).getBookingId());
	}
	
	//Checks if getting an admin booking returns the correct result
	@Test
	void getBookingAdmin() throws ParseException, JsonProcessingException {
		Booking booking = userService.createBooking(validWorker.getUserId(), validCustomer.getUserId(), "9-10", testDate, "Baking");
    	List<Booking> bookings = userService.getBookings(validAdmin.getUserId(), false);

    	assertEquals(booking.getBookingId(), bookings.get(0).getBookingId());
	}
	
	//Checks if cancelling a booking does not calls an exception
	@Test
	void cancelBooking() throws ParseException {
		Booking booking = userService.createBooking(validWorker.getUserId(), validCustomer.getUserId(), "9-10", testDate, "Baking");
		userService.cancelBooking(booking.getBookingId());
	}
	
	//Checks if cancelling a booking within 48 hours calls an exception
	@Test
	void cancelBookingAfterCutoff() throws ParseException {
		String newDate = formatter.format(currentDate.getTime() +(1 * 86400000));
    	userService.setShifts(validWorker.getUserId(), newDate);
		Booking booking = userService.createBooking(validWorker.getUserId(), validCustomer.getUserId(), "9-10", newDate, "Baking");
		Assertions.assertThrows(ValidationException.class, () -> {
			userService.cancelBooking(booking.getBookingId());
		});
	}
	
	//Checks if marking a booking works as intended
	@Test
	void finishBooking() throws ParseException {
		Booking booking = userService.createBooking(validWorker.getUserId(), validCustomer.getUserId(), "9-10", testDate, "Baking");
		userService.finishBooking(booking.getBookingId());
		
		List<Booking> bookings = userService.getBookings(validAdmin.getUserId(), false);
    	assertTrue(bookings.isEmpty());
	}
	
	//Checks if getting past bookings returns the correct result
	@Test
	void getPastBooking() throws ParseException, JsonProcessingException {
		Booking booking = userService.createBooking(validWorker.getUserId(), validCustomer.getUserId(), "9-10", testDate, "Baking");
		userService.finishBooking(booking.getBookingId());
    	List<Booking> bookings = userService.getBookings(validAdmin.getUserId(), true);

    	assertEquals(booking.getBookingId(), bookings.get(0).getBookingId());
	}
	
	@Test
	void contextLoads() {
	}
	
}
