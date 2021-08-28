const ClinicsController = require('../controllers/clinics');
const TestUtil = require("../utils/testutil");
const request = require("supertest");
const httpMocks = require("node-mocks-http");
const app = require("../app");
const mock = require("../utils/mock.json");
const mockSingleClinic = require("../utils/mock-singleClinic.json");
const mockSearchByAllParam = require("../utils/mock-clinicStateAvailability.json");
const mockstate = require("../utils/mock-state.json");
const clinicsController = new ClinicsController();
const testUtil=new TestUtil();


let req, res;
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();

describe("Clinic provider Can be searched by CLininc Name, State, and availability", () => {
    it("Should Return All Clinic", async () => {
      const searchTerm = testUtil.createTestClinic();
      const response = await request(app).get("/api/SearchByMultipleClinic/");
      expect(response.text).toContain(searchTerm.clinicName);
      expect(JSON.parse(response.text)).toStrictEqual(mock);
         
    });
    it("Should Return Clinic By Clinic Name", async () => {
        const searchTerm = testUtil.createTestClinic();
        const response = await request(app).get("/api/SearchByMultipleClinic/?clinicName=Mayo Clinic");
        expect(JSON.parse(response.text)).toStrictEqual(mockSingleClinic);
                  
      });
    it("Should Return Searched by Clinic Name, State, Availability From and To", async () => {
        const searchTerm = testUtil.createTestClinic();
        const response = await request(app).get("/api/SearchByMultipleClinic/?clinicName=Good&from=10:00&to=20:00&state=Alaska");
        expect(JSON.parse(response.text)).toStrictEqual(mockSearchByAllParam);         
    });
    it("Should Return Searched by State", async () => {
        const searchTerm = testUtil.createTestClinic();
        const response = await request(app).get("/api/SearchByMultipleClinic/?clinicName=Good");
        expect(JSON.parse(response.text)).toStrictEqual(mockstate);         
    });
});