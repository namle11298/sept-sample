package agme.backend2.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class WorkerAvailability {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
    private Integer availabilityId;
	
	private Integer userId;	
    private String timeslot;
    private String status;

    public WorkerAvailability(User user, String timeslot, String status) {
    	this.userId = user.getUserId();
    	this.timeslot = timeslot;
    	this.status = status;
    }
    
    public WorkerAvailability() {
    	
    }

	public void setStatus(String status) {
		this.status = status;
	}

}
