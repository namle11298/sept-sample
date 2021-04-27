package agme.backend2.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import agme.backend2.models.User;
import agme.backend2.repositories.UserRepository;

@Service
public class UserDetailService implements UserDetailsService {
	@Autowired
    UserRepository userRepository;
	
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		try {
			User user = userRepository.findByUsername(username);
			if (user == null) {
				return null;
			}
			return user;
		}
		catch (Exception e) {
			throw new UsernameNotFoundException("User not found");
		}	

	}

}
