package agme.backend2.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import agme.backend2.models.Contact;

@Repository
public interface ContactRepository extends CrudRepository<Contact, Long>{
	Contact findByUserId(Integer userId);
}
