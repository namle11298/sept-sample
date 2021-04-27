package agme.backend2.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import agme.backend2.models.AdminCompany;
@Repository
public interface AdminCompanyRepository extends CrudRepository<AdminCompany, Long> {

	@Query("select ac.adminId from AdminCompany ac where ac.company = ?1")
	Integer findAdminIdByCompany(String company);
	
	@Query("select ac from AdminCompany ac")
	List<AdminCompany> findAllCompany();
	
}
