import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container } from 'react-bootstrap';
import '../App.css';
import { useTranslation } from 'react-i18next';

export default function MyNavbar() {
    const { t } = useTranslation();

  return (
    <>
        <Navbar style={{ backgroundColor:'#122025'}} >
          <Container>
            <Navbar.Brand href="#home" style={{color:'#47C2BF'}}>
                <img src="/logo.png" width="50px" />{' '}{t('app_name')}
            </Navbar.Brand>
          </Container>
        </Navbar>
    </>
  );
}