//const ClinicsController = require('../controllers/clinics');
class TestUtil {
    createTestClinic = () => {
        return {
            clinicName: "Mayo Clinic",
            state: "Florida",
            from: "09:00",
            to: "20:00"
        };
  }
  createTestClinicSearchAll = () => {
    return {
        clinicName: "Mayo Clinic",
        state: "Florida",
        from: "09:00",
        to: "20:00"
    };
  };
  createTestClinicSearchByClinic = () => {
    return new clinicModel({
        clinicName: "Mayo Clinic"     
    });
  };
  createTestClinicSearchByState = () => {
    return new clinicModel({
        clinicName: "Mayo Clinic"     
    });
  };
  createTestClinicSearchByAvailability = () => {
    return new clinicModel({
        from: "09:00",
        to: "20:00"    
    });
  };

  
}

module.exports = TestUtil;