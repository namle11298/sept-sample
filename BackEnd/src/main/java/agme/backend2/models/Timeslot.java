package agme.backend2.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Timeslot {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
    private Integer timeslotId;
	private Integer workerId;
	private String timeslot;
	private String stringDate;
	private boolean booked = false;
	
    public Timeslot(Integer workerId, String timeslot, String stringDate) {
    	this.setWorkerId(workerId);
    	this.setTimeslot(timeslot);
    	this.setStringDate(stringDate);
    }

    public Timeslot() {
    	
    }
    
    public Integer getTimeslotId() {
    	return timeslotId;
    }

	public Integer getWorkerId() {
		return workerId;
	}

	public void setWorkerId(Integer workerId) {
		this.workerId = workerId;
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

	public boolean getBooked() {
		return booked;
	}

    public void setBooked(boolean booked) {
    	this.booked = booked;
    }
    
}
