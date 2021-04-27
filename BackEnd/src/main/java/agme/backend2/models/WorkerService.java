package agme.backend2.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class WorkerService {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
    private Integer serviceId;
	
	private Integer userId;	
    private String service;
    private String status;
    private String description;

    public WorkerService(Integer userId, String service, String status, String description) {
    	this.userId = userId;
    	this.service = service;
    	this.status = status;
    	this.description = description;
    }
    
    public WorkerService() {
    	
    }

	public void setStatus(String status) {
		this.status = status;
	}


	public void setDescription(String description) {
		this.description = description;
	}
	
}
