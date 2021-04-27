package agme.backend2;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import agme.backend2.exceptions.ValidationException;
import agme.backend2.models.User;
import agme.backend2.services.UserService;

@SpringBootTest
class Backend2ApplicationTests {
	
	@Autowired
    UserService userService;
	User validUser;
	
	@BeforeEach
	void init() {
		userService.deleteAll();
    	userService.registerCustomer("fname", "lname", "test1", "password", "password", "address", "phone", "Customer");
	}
	
	@AfterEach
	void clearRepository() {
		userService.deleteAll();
	}
	
	//Checks if registering an admin passes without calling an exception
	@Test
	void registerAdmin() {
    	userService.registerAdmin("fname", "lname", "admin", "password", "password", "test company", "address", "phone", "Admin");		
	}
	
	//Checks if registering a customer passes without calling an exception
	@Test
	void registerUser(){
    	userService.registerCustomer("fname", "lname", "registertest", "password", "password", "address", "phone", "Customer");
	}
	
	//Checks if registering a worker assigned to an admin passes without calling an exception
	@Test
	void registerWorker() {
    	userService.registerAdmin("fname", "lname", "admin", "password", "password", "test company", "address", "phone", "Admin");
    	User admin = userService.validateUser("admin", "password");
    	Integer adminId = admin.getUserId();
    	userService.registerWorker("fname", "lname", "workertest", "password", "password", "address", "phone", "Worker", adminId);		
	}
	
	//Checks if login is successful
	@Test
	void validateUserSuccess(){
    	validUser = userService.validateUser("test1", "password");
    	assertEquals("fname", validUser.getFirstName());
	}
	
	//Checks if entering an incorrect username and password calls an exception
	@Test
	void validateUserFail(){
		Assertions.assertThrows(ValidationException.class, () -> {
			validUser = userService.validateUser("nothing", "password");
			validUser.getUserId();
		});
	}
       
	//Checks if all users have a unique id
    @Test
    void uniqueId(){
    	userService.registerCustomer("fname", "lname", "test2", "password", "password", "address", "phone", "Customer");
    	assertNotEquals(userService.validateUser("test1", "password").getUserId(), 
    			userService.validateUser("test2", "password").getUserId());
    }
	
    //Checks if non-matching passwords calls an exception
	@Test
	void checkConfirmPasswordFailure(){
		Assertions.assertThrows(ValidationException.class, () -> {
	    	userService.registerCustomer("fname", "lname", "test3", "password", "password2", "address", "phone", "Customer");
		});
	}
	
	//Checks if trying to create a duplicate username calls an exception
	@Test
	void checkDuplicateUsernameFailure(){
		Assertions.assertThrows(ValidationException.class, () -> {
	    	userService.registerCustomer("fname", "lname", "test1", "password", "password", "address", "phone", "Customer");
		});
	}
	
	//Checks if creating a worker with no admin calls an exception
	@Test
	void checkWorkerNoAdmin() {
		Assertions.assertThrows(ValidationException.class, () -> {
			userService.registerWorker("fname", "lname", "test1", "password", "password", "address", "phone", "Worker", 69);
		});
	}
	
	@Test
	void contextLoads() {
	}
	
}
