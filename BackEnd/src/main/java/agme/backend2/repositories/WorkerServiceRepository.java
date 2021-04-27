
package agme.backend2.repositories;

import org.springframework.stereotype.Repository;

import agme.backend2.models.WorkerService;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

@Repository
public interface WorkerServiceRepository extends CrudRepository<WorkerService, Long> {

	@Query("select ws from WorkerService ws where ws.userId = ?1 and ws.service = ?2")
	WorkerService findByUserIdAndName (Integer userId, String service);
	
	@Query("select ws.status from WorkerService ws where ws.userId = ?1 and ws.service = ?2")
	String findStatusByUserIdAndName (Integer userId, String service);
	
	@Query("select ws.service from WorkerService ws where ws.userId = ?1")
	List<String> findServiceByUserId(Integer userId);
	
	@Query("select ws.description from WorkerService ws where ws.userId = ?1 and ws.service = ?2")
	String findDescriptionByUserIdAndName (Integer userId, String service);
}
