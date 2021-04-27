
package agme.backend2.repositories;

import org.springframework.stereotype.Repository;

import agme.backend2.models.User;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
	@Query("select u from User u where u.username = ?1 and u.password = ?2")
	User findByUsernameAndPassword (String username, String password);
	User findByUserId(Integer userId);
	
	Integer countByUsername(String username);
	Integer countByUserId(Integer userId);
	
	@Query("select u from User u where u.username = ?1")
	User findByUsername (String username);
	
	@Query("select u.userId from User u where u.username = ?1")
	Integer findUserIdByUsername (String username);
	
	@Query("select u.role from User u where u.userId = ?1")
	String findRoleByUserId(Integer userId);
	
	@Query("select distinct u from User u, Management m, Timeslot t where u.userId = m.workerId and u.userId = t.workerId and m.adminId = ?1 and t.stringDate = ?2")
	List<User> findWorkerByAdminIdAndDate(Integer adminId, String date);
}
