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
class WorkerTests {
	@Autowired
    UserService userService;
	User validAdmin;
	User validWorker;
	
	@BeforeEach
	void init() {
    	userService.registerAdmin("adminFirstName","adminLastName","adminUsername","adminPassword","adminPassword","adminCompany","adminAddress","adminPhone","admin");
    	validAdmin = userService.validateUser("adminUsername", "adminPassword");
    	userService.registerWorker("workerFirstName", "workerLastName", "workerUsername", "workerPassword", "workerPassword", "workerAddress", "workerPhone",
				"worker", validAdmin.getUserId());    	
	}
	
	@AfterEach
	void clearRepository() {
		userService.deleteAll();
	}
	
	//Checks if registering a worker passes without calling an exception
	@Test
	void registerWorker() {
		userService.registerWorker("testworkerFirstName", "testworkerLastName", "testworkerUsername", "testworkerPassword", "testworkerPassword", "testworkerAddress",
				"testworkerPhone","testworker", validAdmin.getUserId());
	}
	
	//Checks if worker login is successful
	@Test
	void validateWorkerSuccess() {
		validWorker = userService.validateUser("workerUsername", "workerPassword");
		assertEquals("workerFirstName",validWorker.getFirstName());
	}
	
	//Checks if entering an incorrect username and password calls an exception
	@Test
	void validateWorkerFail() {
		Assertions.assertThrows(ValidationException.class, ()->{
			validWorker  = userService.validateUser("wrongWorkerUsername", "workerPassword");
			validWorker.getUserId();
		});
	}
	
	//Checks if trying to create a duplicate username calls an exception
	@Test
	void uniqueUsernameFailure() {
		Assertions.assertThrows(ValidationException.class, ()->{
			userService.registerWorker("workerFirstName", "workerLastName", "workerUsername", "workerPassword", "workerPassword", "workerAddress", "workerPhone",
					"worker", validAdmin.getUserId());
		});
	}
	
	//Checks if all workers have a unique id
	@Test
	void uniqueId() {
		userService.registerWorker("testworkerFirstName", "testworkerLastName", "testworkerUsername", "testworkerPassword", "testworkerPassword", "testworkerAddress",
				"testworkerPhone","testworker", validAdmin.getUserId());
		assertNotEquals(userService.validateUser("workerUsername", "workerPassword").getUserId(),
				userService.validateUser("testworkerUsername", "testworkerPassword").getUserId());
	}
	
}
