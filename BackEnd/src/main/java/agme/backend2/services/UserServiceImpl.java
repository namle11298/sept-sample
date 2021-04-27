package agme.backend2.services;


import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import agme.backend2.exceptions.ValidationException;
import agme.backend2.models.WorkerAvailability;
import agme.backend2.models.AdminCompany;
import agme.backend2.models.Booking;
import agme.backend2.models.Contact;
import agme.backend2.models.Management;
import agme.backend2.models.Timeslot;
import agme.backend2.models.User;
import agme.backend2.models.WorkerService;
import agme.backend2.repositories.WorkerAvailabilityRepository;
import agme.backend2.repositories.AdminCompanyRepository;
import agme.backend2.repositories.BookingRepository;
import agme.backend2.repositories.ContactRepository;
import agme.backend2.repositories.ManagementRepository;
import agme.backend2.repositories.TimeslotRepository;
import agme.backend2.repositories.UserRepository;
import agme.backend2.repositories.WorkerServiceRepository;
import agme.backend2.util.JwtUtil;
import agme.backend2.models.AuthenticationResponse;

@Service
@Transactional
public class UserServiceImpl implements UserService,UserDetailsService {
	@Autowired
    UserRepository userRepository;
	@Autowired
	WorkerAvailabilityRepository workerAvailabilityRepository;
	@Autowired
	WorkerServiceRepository workerServiceRepository;	
	@Autowired
	AdminCompanyRepository adminCompanyRepository;
	@Autowired
	ManagementRepository managementRepository;
	@Autowired
	ContactRepository contactRepository;
	@Autowired
	BookingRepository bookingRepository;	
	@Autowired
	TimeslotRepository timeslotRepository;
	@Autowired
	AuthenticationManager authenticationManager;
	@Autowired
	UserDetailService userDetailService;
	@Autowired
	JwtUtil JwtTokenUtil;
	SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
	
	static final int MILLIS_PER_DAY = 86400000;
	static final int MILLIS_PER_HOUR = 3600000;
	
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	@Override
	//register customer into the database
	public User registerCustomer(String firstName, String lastName, String username, String password, String confirmPassword,
			String address, String phone, String role) throws ValidationException {
		//check if password matches confirm password
		if(!password.equals(confirmPassword)) {
			throw new ValidationException("Password and confirm password do not match");
		}
		Integer usernameCount = userRepository.countByUsername(username);
		//validation checks to see if username already existed to keep it unique
		if (usernameCount > 0){
			throw new ValidationException("Username already existed");
		}
		User newUser = new User();
		newUser.setFirstName(firstName);
		newUser.setLastName(lastName);
		newUser.setUsername(username);
		newUser.setPassword(password);
		newUser.setAddress(address);
		newUser.setPhone(phone);
		newUser.setRole(role);
		return userRepository.save(newUser);
	}
	
	@Override
	//registering admin into database
	public User registerAdmin(String firstName, String lastName, String username, String password,
			String confirmPassword, String company, String address, String phone, String role)  {
		User newUser = registerCustomer(firstName,lastName,username,password,confirmPassword,address,phone,role);
		AdminCompany newCompany = new AdminCompany();
		newCompany.setAdminId(newUser.getUserId());
		newCompany.setCompany(company);
		adminCompanyRepository.save(newCompany);
		Contact newContact = new Contact();
		newContact.setPhone(phone);
		newContact.setUserId(newUser.getUserId());
		contactRepository.save(newContact);
		return newUser;
	}
	
	@Override
	//registering worker into database
	public User registerWorker(String firstName, String lastName, String username, String password,
			String confirmPassword, String address, String phone, String role, Integer adminId) throws ValidationException {
		Integer idCount = userRepository.countByUserId(adminId);		
		if (idCount <= 0){
			throw new ValidationException("Admin does not exist");
		}
		User newUser = registerCustomer(firstName,lastName,username,password,confirmPassword,address,phone,role);
		Management newManagement = new Management();
		newManagement.setAdminId(adminId);
		newManagement.setWorkerId(newUser.getUserId());
		managementRepository.save(newManagement);
		Contact newContact = new Contact();
		newContact.setPhone(phone);
		newContact.setUserId(newUser.getUserId());
		contactRepository.save(newContact);
		return newUser;
	}
	
	@Override
	//get full name of user from id
	public String getName(Integer userId) {
		User user = userRepository.findByUserId(userId);
		String name = user.getFirstName() + " " + user.getLastName();
		return name;
	}
	
	//find availability of worker with that specific username
	public String getAvailability(String username, String name) {
		Integer userId = userRepository.findUserIdByUsername(username);
		if (userId == null) {
			throw new ValidationException("User does not exist");			
		}
		String availability = workerAvailabilityRepository.findStatusByUserIdAndName(userId, name);
		if (availability == null) {
			throw new ValidationException("Timeslot does not exist");			
		}
		return availability;				
	}
	
	@Override
	//set availability for the specific user (worker)
	public void setAvailability(String username, String name, String availability) {
		User user = userRepository.findByUsername(username);
		if (user == null) {
			throw new ValidationException("User does not exist");			
		}
		Integer userId = user.getUserId();
		WorkerAvailability timeslot = workerAvailabilityRepository.findByUserIdAndName(userId, name);
		if (timeslot == null) {
			timeslot = new WorkerAvailability(user, name, availability);
		} else {
			timeslot.setStatus(availability);
		}
		workerAvailabilityRepository.save(timeslot);		
	}
	
	@Override
	//get all available timeslots for a worker
	public List<Timeslot> getShifts(Integer workerId){
		List<Timeslot> shifts = timeslotRepository.findByWorkerIdAndBooked(workerId, false);
		return shifts;
	}
	
	@Override
	//create all timeslots for a day
	public void setShifts(Integer workerId, String stringDate) throws ParseException {
		//validation so worker cannot work the same day multiple times
		List<Integer> list = timeslotRepository.findTimeslotIdByWorkerIdAndStringDate(workerId, stringDate);
		if (!list.isEmpty()) {
			throw new ValidationException("Worker is already assigned to that date");
		}
		timeslotRepository.save(new Timeslot(workerId, "9-10", stringDate));
		timeslotRepository.save(new Timeslot(workerId, "10-11", stringDate));
		timeslotRepository.save(new Timeslot(workerId, "11-12", stringDate));
		timeslotRepository.save(new Timeslot(workerId, "12-13", stringDate));
		timeslotRepository.save(new Timeslot(workerId, "13-14", stringDate));
		timeslotRepository.save(new Timeslot(workerId, "14-15", stringDate));
		timeslotRepository.save(new Timeslot(workerId, "15-16", stringDate));
		timeslotRepository.save(new Timeslot(workerId, "16-17", stringDate));
	}
	
	@Override
	//method to delete all timeslots for a day
	public void deleteShifts(Integer workerId, String stringDate) {
		List<Integer> list = timeslotRepository.findTimeslotIdByWorkerIdAndStringDate(workerId, stringDate);
		for (Integer i: list) {
			timeslotRepository.deleteByTimeslotId(i);
		}
	}
	
	@Override
	//set services provided by admin into database
	public String getService(Integer userId, String name) {
		String workerService = workerServiceRepository.findStatusByUserIdAndName(userId, name);
		if (workerService == null) {
			throw new ValidationException("Service does not exist");			
		}
		return workerService;			
	}
	
	@Override
	//set services provided by admin into database
	public List<String> getAllServices(Integer userId) {
		List<String> workerService = workerServiceRepository.findServiceByUserId(userId);
		return workerService;			
	}
	
	@Override
	//get services provided by admin from database
	public void setService(Integer userId, String name, String availability, String description) {
		WorkerService workerService = workerServiceRepository.findByUserIdAndName(userId, name);
		if (workerService == null) {
			workerService = new WorkerService(userId, name, availability, description);
		} else {
			workerService.setStatus(availability);
			workerService.setDescription(description);
		}
		workerServiceRepository.save(workerService);		
	}
		
	@Override
	public void deleteAll() {
		userRepository.deleteAll();
		workerAvailabilityRepository.deleteAll();
		workerServiceRepository.deleteAll();
		bookingRepository.deleteAll();
		timeslotRepository.deleteAll();
	}

	@Override
	public User validateUser(String username, String password) throws ValidationException {
		User newUser = userRepository.findByUsernameAndPassword(username, password);
		if (newUser == null) {
			throw new ValidationException("Wrong username or password");
		}
		return newUser;
	}
	
	public AuthenticationResponse createAuthenticationToken(String username, String password) throws Exception{
		try {
			authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(username,password));
		}
		catch(BadCredentialsException e){
			throw new Exception("Incorrect username or password", e);
		}
		
		final UserDetails userDetails = userDetailService.loadUserByUsername(username);
		final String jwt = JwtTokenUtil.generateToken(userDetails);
		User user = userRepository.findByUsername(username);
		AuthenticationResponse authenticationResponse = new AuthenticationResponse();
		authenticationResponse.setAddress(user.getAddress());
		authenticationResponse.setFirstName(user.getFirstName());
		authenticationResponse.setJwt(jwt);
		authenticationResponse.setLastName(user.getLastName());
		authenticationResponse.setPassword(user.getPassword());
		authenticationResponse.setPhone(user.getPhone());
		authenticationResponse.setRole(user.getRole());
		authenticationResponse.setUserId(user.getUserId());
		authenticationResponse.setUsername(user.getUsername());
		return authenticationResponse;
		
	}

	@Override
	//get admin id from company name
	public Integer getAdminId(String company) {
		Integer adminId = adminCompanyRepository.findAdminIdByCompany(company);
		if (adminId == null) {
			throw new ValidationException("Company does not exist");
		}
		return adminId;
	}
	
	@Override
	//get all company names
	public List<AdminCompany> getAllCompanies(){
		List<AdminCompany> companies = adminCompanyRepository.findAllCompany();
		return companies;
	}
	
	@Override
	//get description
	public String getDescription(Integer adminId, String service){
		String description = workerServiceRepository.findDescriptionByUserIdAndName(adminId, service);
		return description;
	}
	
	@Override
	//get workers by admin id and date
	public List<User> getWorkerOnDate(Integer adminId, String date) {
		List<User> worker = userRepository.findWorkerByAdminIdAndDate(adminId, date);
		return worker;
	}
	
	@Override
	//get all current bookings for a worker or customer
	public List<Booking> getBookings(Integer userId, boolean done){
		List<Booking> bookings = null;
		String role = userRepository.findRoleByUserId(userId);

		if (role.toLowerCase().equals("worker")) {
			bookings = bookingRepository.findByWorkerIdAndDone(userId, done);
		} else if (role.toLowerCase().equals("customer")) {
			bookings = bookingRepository.findByCustomerIdAndDone(userId, done);
		} else if (role.toLowerCase().equals("admin")) {
			bookings = bookingRepository.findByAdminIdAndDone(userId, done);
		} else {
			throw new ValidationException("User has an incorrect role");
		}
		
		return bookings;
	}
	
	@Override
	//create a booking
	public Booking createBooking(Integer workerId, Integer customerId, String timeslot, String stringDate, String serviceName) throws ParseException{
		Date date = formatter.parse(stringDate);
		Booking booking = null;
		Date currentDate = new Date();
		Date cutoff = new Date(currentDate.getTime() + (7 * MILLIS_PER_DAY));
		if (date.after(cutoff)) {			
			throw new ValidationException("Booking must be within 7 days");			
		} else if (date.before(currentDate)) {			
			throw new ValidationException("Booking cannot be before the current time");			
		}
		Integer timeslotId = timeslotRepository.findTimeslotIdByWorkerIdAndTimeslotAndStringDate(workerId, timeslot, stringDate);
		if (timeslotId == null) {
			throw new ValidationException("Timeslot does not exist");
		}
		if (bookingRepository.findByTimeslotId(timeslotId) != null) {
			throw new ValidationException("Worker is booked for that time");		
		}
		
		Timeslot shift = timeslotRepository.findByTimeslotId(timeslotId);
		shift.setBooked(true);
		timeslotRepository.save(shift);
		
		Integer adminId = managementRepository.findAdminIdByWorkerId(workerId);
		
		booking = new Booking(workerId, this.getName(workerId), customerId, this.getName(customerId), timeslotId, timeslot, stringDate, serviceName, adminId);
		return bookingRepository.save(booking);
	}
	
	@Override
	//delete a booking
	public void cancelBooking(Integer bookingId) throws ParseException{
		Date bookingDate = formatter.parse(bookingRepository.getStringDateByBookingId(bookingId));
		Date currentDate = new Date();
		Date cutoff = new Date(bookingDate.getTime() - (2 * MILLIS_PER_DAY));
		if (currentDate.after(cutoff)) {
			throw new ValidationException("Booking cannot be cancelled within 48 hours");
		}
		
		Integer timeslotId = bookingRepository.findTimeslotIdByBookingId(bookingId);
		Timeslot timeslot = timeslotRepository.findByTimeslotId(timeslotId);
		timeslot.setBooked(false);
		timeslotRepository.save(timeslot);
		
		bookingRepository.deleteByBookingId(bookingId);
	}
	
	@Override
	//mark a booking as done
	public void finishBooking(Integer bookingId) {
		Booking booking = bookingRepository.findByBookingId(bookingId);
		booking.setDone(true);
		bookingRepository.save(booking);
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		return userRepository.findByUsername(username);
	}
	
	@Override
	public Contact getContact(Integer userId) {		
		return contactRepository.findByUserId(userId);
	}
	
	@Override
	public Contact setContact(Integer userId, String phone, String email, String detail) {
		Contact newContact = contactRepository.findByUserId(userId);
		newContact.setPhone(phone);
		newContact.setEmail(email);
		newContact.setDetail(detail);
		return contactRepository.save(newContact);
		
	}
	
}
