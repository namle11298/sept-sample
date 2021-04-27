package agme.backend2.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import agme.backend2.models.Management;

@Repository
public interface ManagementRepository extends CrudRepository<Management, Long> {
	List<Management> findAllByAdminId(Integer adminId);
	
	@Query("select m.adminId from Management m where m.workerId = ?1")
	Integer findAdminIdByWorkerId (Integer workerId);
}
