package agme.backend2.services;

import java.util.List;

import agme.backend2.models.Management;
import agme.backend2.models.User;

public interface ManagementService {
	List<User> getAllWorkerFromAdmin(Integer adminId);
}
