package agme.backend2.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Management {
	@Id
	@GeneratedValue
	private Integer managementId;
	private Integer adminId;
	private Integer workerId;
	
	

	public Management() {
		// TODO Auto-generated constructor stub
	}

	public Integer getManagementId() {
		return managementId;
	}

	public void setManagementId(Integer managementId) {
		this.managementId = managementId;
	}

	public Integer getAdminId() {
		return adminId;
	}

	public void setAdminId(Integer adminId) {
		this.adminId = adminId;
	}

	public Integer getWorkerId() {
		return workerId;
	}

	public void setWorkerId(Integer workerId) {
		this.workerId = workerId;
	}	
}
