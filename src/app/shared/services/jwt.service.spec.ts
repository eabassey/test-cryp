import { JwtService } from './jwt.service';


describe('Jwt Service', () => {
    let  jwtServiceMock: JwtService;

  beforeEach(() => {
    jwtServiceMock = new JwtService();
    
  });

  beforeAll(() => {
    if(localStorage.getItem('jwtToken')) {
      localStorage.removeItem('jwtToken');
    }
  });

  it('should be able to save jwtToken to localStorage', () => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ";
    
    jwtServiceMock.saveToken(token);
    expect(window.localStorage.getItem('jwtToken')).toEqual(token);
  });

  it('should be able to get jwtToken from localStorage', () => {
    
    const token = jwtServiceMock.getToken();
    expect(localStorage.getItem('jwtToken')).toEqual(token);
  });

  it('should be able to remove jwtToken from localStorage', () => {
    
    jwtServiceMock.destroyToken();
    expect(localStorage.getItem('jwtToken')).toBeNull();
  });

});