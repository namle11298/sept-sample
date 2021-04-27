package agme.backend2.controllers;

import java.sql.SQLOutput;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import agme.backend2.models.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import agme.backend2.exceptions.ValidationException;
import agme.backend2.services.ManagementService;
import agme.backend2.services.UserDetailService;
import agme.backend2.services.UserService;
import agme.backend2.util.JwtUtil;

@RestController
@CrossOrigin (origins = "http://localhost:3000", allowCredentials = "true")
public class UserController {
	@Autowired
	UserService userService;
	
	@Autowired
	UserDetailService userDetailService;
	
	@Autowired
	JwtUtil JwtTokenUtil;
	
	@Autowired
	AuthenticationManager authenticationManager;
	
	@Autowired
	ManagementService managementService;

	//Registering a user of role customer into the database
	@PostMapping("/register/customer")
	public ResponseEntity<?> registerCustomer(@RequestBody Map<String, Object> userMap){
		String firstName = (String) userMap.get("firstName");
        String lastName = (String) userMap.get("lastName");
        String username = (String) userMap.get("username");
        String password = (String) userMap.get("password");
        String confirmPassword = (String) userMap.get("confirmPassword");
        String address = (String) userMap.get("address");
        String phone = (String) userMap.get("phone");
        String role = (String) userMap.get("role");
        User newUser = userService.registerCustomer(firstName,lastName,username,password,confirmPassword,address,phone,role);
		return new ResponseEntity<>(newUser,HttpStatus.CREATED);
	}
	//Registering a user of role admin into the database
	@PostMapping("/register/admin")
	public ResponseEntity<?> registerAdmin(@RequestBody Map<String, Object> userMap){
		String firstName = (String) userMap.get("firstName");
        String lastName = (String) userMap.get("lastName");
        String username = (String) userMap.get("username");
        String password = (String) userMap.get("password");
        String confirmPassword = (String) userMap.get("confirmPassword");
        String company = (String)userMap.get("company");
        String address = (String) userMap.get("address");
        String phone = (String) userMap.get("phone");
        String role = (String) userMap.get("role");
        User newUser = userService.registerAdmin(firstName,lastName,username,password,confirmPassword,company,address,phone,role);
		return new ResponseEntity<>(newUser,HttpStatus.CREATED);
	}
	//Registering user of role worker by admin into the database
	@PostMapping("/register/worker")
	public ResponseEntity<?> registerWorker(@RequestBody Map<String, Object> userMap){
		String firstName = (String) userMap.get("firstName");
        String lastName = (String) userMap.get("lastName");
        String username = (String) userMap.get("username");
        String password = (String) userMap.get("password");
        String confirmPassword = (String) userMap.get("confirmPassword");
        String address = (String) userMap.get("address");
        String phone = (String) userMap.get("phone");
        String role = (String) userMap.get("role");
        Integer adminId = (Integer) userMap.get("adminId");
        User newUser = userService.registerWorker(firstName,lastName,username,password,confirmPassword,address,phone,role,adminId);
		return new ResponseEntity<>(newUser,HttpStatus.CREATED);
	}
	//uses validateUser method to query from the database, if found, return the status that a user is found with
	//that specific name and password
	@PostMapping("/login")
	public ResponseEntity<?> loginUser(@RequestBody Map<String, Object> userMap) throws Exception{
		String email = (String) userMap.get("username");
        String password = (String) userMap.get("password");
        AuthenticationResponse authenticationResponse = userService.createAuthenticationToken(email, password);
        return new ResponseEntity<>(authenticationResponse,HttpStatus.CREATED);		
	}
	
	//function to find all workers under the specific admin id
	@PostMapping("/getworker/{adminId}")
	public ResponseEntity<?> getWorkerFromAdmin(@PathVariable Integer adminId){
		List<User> worker = new ArrayList<User>();
		worker = managementService.getAllWorkerFromAdmin(adminId);
		return new ResponseEntity<>(worker,HttpStatus.OK);
	}
	
	//function to get all workers for an admin and date
	@PostMapping("/getWorkerOnDate")
	public ResponseEntity<?> getWorkerOnDate(@RequestBody Map<String, Object> userMap) throws JsonProcessingException{
		Integer adminId = (Integer) userMap.get("adminId");
		String date = (String) userMap.get("date");
        List<User> workers = userService.getWorkerOnDate(adminId, date);
        return new ResponseEntity<>(workers,HttpStatus.OK);
	}

	//function to get all worker availability for worker
	@PostMapping("/getAvailability")
	public ResponseEntity<?> getAvailability(@RequestBody Map<String, Object> userMap){
		String username = (String) userMap.get("username");
		String timeslot = (String) userMap.get("timeslot");
        String availability = userService.getAvailability(username, timeslot);
        return new ResponseEntity<>(availability,HttpStatus.OK);
	}

	//function to set availability of the worker
	@PostMapping("/setAvailability")
	public ResponseEntity<?> setAvailability(@RequestBody Map<String, Object> userMap){
		String username = (String) userMap.get("username");
		String timeslot = (String) userMap.get("timeslot");
        String availability = (String) userMap.get("availability");
        userService.setAvailability(username, timeslot, availability);
        return new ResponseEntity<>(availability,HttpStatus.CREATED);
	}

	//function to get shift for the specific worker
	@PostMapping("/getShift")
	public ResponseEntity<?> getShift(@RequestBody Map<String, Object> userMap) throws JsonProcessingException{
		Integer workerId = (Integer) userMap.get("workerId");
        List<Timeslot> shifts = userService.getShifts(workerId);
        return new ResponseEntity<>(shifts,HttpStatus.OK);
	}

	//function to set a shift for a specific worker
	@PostMapping("/setShift")
	public ResponseEntity<?> setShift(@RequestBody Map<String, Object> userMap) throws ParseException {
		Integer userId = (Integer) userMap.get("userId");
		String date = (String) userMap.get("date");
        userService.setShifts(userId, date);
        return new ResponseEntity<>(date,HttpStatus.CREATED);
	}
	
	//function to delete a shift for a specific worker
	@PostMapping("/deleteShift")
	public ResponseEntity<?> deleteShift(@RequestBody Map<String, Object> userMap) throws ParseException {
		Integer userId = (Integer) userMap.get("userId");
		String date = (String) userMap.get("date");
        userService.deleteShifts(userId, date);
        return new ResponseEntity<>(date,HttpStatus.OK);
	}

	//function to get all services provided by an admin
	@PostMapping("/checkService")
	public ResponseEntity<?> checkService(@RequestBody Map<String, Object> userMap){
		Integer adminId = (Integer) userMap.get("adminId");
		String service = (String) userMap.get("service");
        String availability = userService.getService(adminId, service);
        return new ResponseEntity<>(availability,HttpStatus.OK);
	}
	
	//function to get all services provided by an admin
	@PostMapping("/getServices")
	public ResponseEntity<?> getServices(@RequestBody Map<String, Object> userMap){
		Integer adminId = (Integer) userMap.get("adminId");
        List<String> services = userService.getAllServices(adminId);
        return new ResponseEntity<>(services,HttpStatus.OK);
	}

	//function to set services by admin 
	@PostMapping("/setService")
	public ResponseEntity<?> setService(@RequestBody Map<String, Object> userMap){
		Integer adminId = (Integer) userMap.get("adminId");
		String service = (String) userMap.get("service");
        String availability = (String) userMap.get("availability");
        String description = (String) userMap.get("description");
        userService.setService(adminId, service, availability,description);
        return new ResponseEntity<>(availability,HttpStatus.CREATED);
	}
	
	//function to get an adminId from a company name
	@PostMapping("/getAdminId")
	public ResponseEntity<?> getAdminId(@RequestBody Map<String, Object> userMap){
		String company = (String) userMap.get("company");
        Integer adminId = userService.getAdminId(company);
        return new ResponseEntity<>(adminId,HttpStatus.OK);
	}

	//function to get all companies
	@PostMapping("/getAllCompanies")
	public ResponseEntity<?> getAllCompanies(){
        List<AdminCompany> companies = userService.getAllCompanies();
        return new ResponseEntity<>(companies,HttpStatus.OK);
	}
	
	//function to get service description
	@PostMapping("/getDescription")
	public ResponseEntity<?> getDescription(@RequestBody Map<String, Object> userMap){
		Integer adminId = (Integer) userMap.get("adminId");
		String service = (String) userMap.get("service");
        String description = userService.getDescription(adminId, service);
        return new ResponseEntity<>(description,HttpStatus.OK);
	}


	//function to get all bookings of a customer or worker
	@PostMapping("/getBookings")
	public ResponseEntity<?> getBookings(@RequestBody Map<String, Object> userMap) throws JsonProcessingException{
		Integer userId = (Integer) userMap.get("userId");
		List<Booking> bookings = new ArrayList<Booking>();
		bookings = userService.getBookings(userId, false);
        return new ResponseEntity<>(bookings,HttpStatus.OK);
	}

	//function to create a booking
	@PostMapping("/createBooking")
	public ResponseEntity<?> createBooking(@RequestBody Map<String, Object> userMap) throws ParseException, JsonProcessingException{
		Integer workerId = (Integer) userMap.get("workerId");
		Integer customerId = (Integer) userMap.get("customerId");
		String timeslot = (String) userMap.get("timeslot");
		String date = (String) userMap.get("date");
		String serviceName = (String) userMap.get("serviceName");
		Booking booking = userService.createBooking(workerId, customerId, timeslot, date, serviceName);
        return new ResponseEntity<>(booking,HttpStatus.CREATED);
	}
	
	//function to cancel a booking
	@PostMapping("/cancelBooking")
	public ResponseEntity<?> cancelBooking(@RequestBody Map<String, Object> userMap) throws ParseException{
		Integer bookingId = (Integer) userMap.get("bookingId");
		userService.cancelBooking(bookingId);
        return new ResponseEntity<>(bookingId,HttpStatus.CREATED);
	}
	
	//function to mark a booking as done
	@PostMapping("/finishBooking")
	public ResponseEntity<?> finishBooking(@RequestBody Map<String, Object> userMap) throws ParseException{
		Integer bookingId = (Integer) userMap.get("bookingId");
		userService.finishBooking(bookingId);
        return new ResponseEntity<>(bookingId,HttpStatus.CREATED);
	}
	
	//function to get past bookings
	@PostMapping("/getPastBookings")
	public ResponseEntity<?> getPastBookings(@RequestBody Map<String, Object> userMap) throws ParseException{
		Integer userId = (Integer) userMap.get("userId");
		List<Booking> bookings = new ArrayList<Booking>();
		bookings = userService.getBookings(userId, true);
        return new ResponseEntity<>(bookings,HttpStatus.OK);
	}
	
	@PostMapping("/getContactInfo")
	public ResponseEntity<?> getContactInfo(@RequestBody Map<String, Object> userMap){
		Integer userId = (Integer) userMap.get("userId");
		Contact contact = userService.getContact(userId);
		return new ResponseEntity<>(contact,HttpStatus.OK);
		
	}
	
	@PostMapping("/setContactInfo")
	public ResponseEntity<?> setContactInfo(@RequestBody Map<String, Object> contactMap) {
		Integer userId = (Integer) contactMap.get("userId");
		String phone = (String) contactMap.get("phone");
		String email = (String) contactMap.get("email");
		String detail = (String) contactMap.get("detail");
		Contact contact = userService.setContact(userId, phone, email, detail);		
		return new ResponseEntity<>(contact,HttpStatus.OK);
		
	}
}
