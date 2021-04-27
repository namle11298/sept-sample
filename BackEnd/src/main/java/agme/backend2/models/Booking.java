package agme.backend2.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Booking {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
    private Integer bookingId;
	
	private Integer workerId;
	private String workerName;
	private Integer customerId;
	private String customerName;
	private Integer timeslotId;
    private String timeslot;
    private String stringDate;
    private String serviceName;
    boolean done = false;
    private Integer adminId;
    
    public Booking(Integer workerId, String workerName, Integer customerId, String customerName, Integer timeslotId, String timeslot, String stringDate, String serviceName, Integer adminId) {
    	this.setWorkerId(workerId);
    	this.setWorkerName(workerName);
    	this.setCustomerId(customerId);
    	this.setCustomerName(customerName);
    	this.setTimeslotId(timeslotId);
    	this.setTimeslot(timeslot);
    	this.setStringDate(stringDate);
    	this.setServiceName(serviceName);
    	this.setAdminId(adminId);
    }

    public Booking() {
    	
    }

    public Integer getBookingId() {
    	return bookingId;
    }

	public void setBookingId(Integer bookingId) {
		this.bookingId = bookingId;
	}

	public Integer getWorkerId() {
		return workerId;
	}

	public void setWorkerId(Integer workerId) {
		this.workerId = workerId;
	}

	public String getWorkerName() {
		return workerName;
	}

	public void setWorkerName(String workerName) {
		this.workerName = workerName;
	}

	public Integer getCustomerId() {
		return customerId;
	}

	public void setCustomerId(Integer customerId) {
		this.customerId = customerId;
	}

	public String getCustomerName() {
		return customerName;
	}

	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}

	public Integer getTimeslotId() {
		return timeslotId;
	}

	public void setTimeslotId(Integer timeslotId) {
		this.timeslotId = timeslotId;
	}

	public String getTimeslot() {
		return timeslot;
	}

	public void setTimeslot(String timeslot) {
		this.timeslot = timeslot;
	}

	public String getStringDate() {
		return stringDate;
	}

	public void setStringDate(String stringDate) {
		this.stringDate = stringDate;
	}

	public boolean isDone() {
		return done;
	}
	
	
	public String getServiceName() {
		return serviceName;
	}

	public void setServiceName(String serviceName) {
		this.serviceName = serviceName;
	}

	public boolean getDone() {
		return done;
	}

	public void setDone(boolean done) {
		this.done = done;
	}

	public Integer getAdminId() {
		return adminId;
	}

	public void setAdminId(Integer adminId) {
		this.adminId = adminId;
	}
}
