package agme.backend2.models;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class AdminCompany {
	@Id
	private Integer adminId;
	private String company;
	

	public AdminCompany() {
	}
	

	public Integer getAdminId() {
		return adminId;
	}

	public void setAdminId(Integer adminId) {
		this.adminId = adminId;
	}

	public String getCompany() {
		return company;
	}

	public void setCompany(String company) {
		this.company = company;
	}
	
	
}
