import React, { useState } from 'react'
import Grid from "@mui/material/Grid";
import dayjs from "dayjs";
import AddPatient from '../../Components/Patient/AddPatient'
import './styles.scss'
import FullCalender from '../FullCalender/FullCalender';
import PatientList from '../Patient/PatientList';
import AddPrescriptionHome from '../Model/Prescription/AddPrescriptionHome'

const Homepage = () => {
  const [toggledetail, setToggledetails] = useState(1);

  return (
    <div>

      <Grid container>

        <Grid
          item
          xs={6}
          sm={6}
          md={6}
          lg={2.4}
          xl={2.4}
          align="center"
          onClick={() => setToggledetails(1)}
        >
          <div className="bwrapper">

            <div className={toggledetail === 1 ? 'bbutton _3' : 'bbutton _2'} >
              <span style={{ color: toggledetail === 1 ? 'white' : 'black' }}>Dashboard</span><div className="back"></div>
            </div>

          </div>
        </Grid>
        <Grid
          item
          xs={6}
          sm={6}
          md={6}
          lg={2.4}
          xl={2.4}
          align="center"
          onClick={() => setToggledetails(2)}
        >
          <div className="bwrapper">

            <div className={toggledetail === 2 ? 'bbutton _3' : 'bbutton _2'}>
              <span style={{ color: toggledetail === 2 ? 'white' : 'black' }}> Add Patient</span><div className="back"></div>
            </div>

          </div>

        </Grid>
        <Grid
          item
          xs={6}
          sm={6}
          md={6}
          lg={2.4}
          xl={2.4}
          align="center"

          onClick={() => setToggledetails(3)}
        >
          <div className="bwrapper">

            <div className={toggledetail === 3 ? 'bbutton _3' : 'bbutton _2'}>
              <span style={{ color: toggledetail === 3 ? 'white' : 'black' }}>Add Appointment</span><div className="back"></div>
            </div>

          </div>

        </Grid>
        <Grid
          item
          xs={6}
          sm={6}
          md={6}
          lg={2.4}
          xl={2.4}
          align="center"


          onClick={() => setToggledetails(4)}
        >
          <div className="bwrapper">

            <div className={toggledetail === 4 ? 'bbutton _3' : 'bbutton _2'}>
              <span style={{ color: toggledetail === 4 ? 'white' : 'black' }}> Add Prescriptions</span><div className="back"></div>
            </div>

          </div>


        </Grid>
        <Grid
          item
          xs={6}
          sm={6}
          md={6}
          lg={2.4}
          xl={2.4}
          align="center"

          onClick={() => setToggledetails(5)}
        >
          <div className="bwrapper">

            <div className={toggledetail === 5 ? 'bbutton _3' : 'bbutton _2'}>
              <span style={{ color: toggledetail === 5 ? 'white' : 'black' }}>Search Patient</span><div className="back"></div>
            </div>

          </div>

        </Grid>
      </Grid>

      {toggledetail === 1 ? (
        <div style={{ padding: '10px' }}>
          <Grid container xs={12} sm={12} md={12} lg={12} xl={12}>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <div style={{ padding: '20px' }}>
                <Grid container spacing={1} style={{ border: '1px solid #eee', backgroundColor: '#fafafa' }}>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}><div className='zetamed_home_getting_stated'>Getting Started: Step 1</div></Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}><div className='zetamed_home_start_adding'>Start adding patients. Add first patient to your clinic, and then proceed to add appointments, bills, <br />prescriptions for this patient.</div></Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}><button className='zetamed_home_button'>add first patient</button></Grid>
                </Grid>
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <div style={{ padding: '20px' }}>
                <Grid container spacing={1} style={{ border: '1px solid #eee', backgroundColor: '#fafafa' }}>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}><div className='zetamed_home_getting_stated'>Getting Started: Step 2</div></Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}><div className='zetamed_home_start_adding'>Start adding appointments. Build recall value via automated sms and email reminders. <br />prescriptions for this patient.</div></Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}><button className='zetamed_home_button'>add first patient</button></Grid>
                </Grid>
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}><div className='zetamed_home_clinic_dashboard'> Clinic Dashboard</div>
              <hr />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}><div className='zetamed_home_date_now'> {dayjs().format('DD MMMM YYYY')}</div>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}><div className='zetamed_home_data_dash'>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={12} md={3} lg={3} sl={3} >
                  <Grid container style={{ background: "#59B3E6", borderRadius: '10px' }}>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6} ><div style={{ padding: '20px' }}>
                      <img src="https://img.icons8.com/external-icongeek26-linear-colour-icongeek26/64/000000/external-user-essentials-icongeek26-linear-colour-icongeek26.png" alt='userimage' />
                    </div></Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6} spacing={1} align='right'><div className='zetamed_home_patient_count' >
                      <div style={{ fontSize: '40px' }}>0</div>
                      <div>Today Patient</div>
                    </div></Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6} ><div className='zetamed_home_patient_count' style={{ fontSize: '17px' }}>view more</div></Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6} align='right'><div className='zetamed_home_patient_count'><img style={{ color: 'white' }} src="https://img.icons8.com/material/24/000000/circled-right-2--v1.png" alt='arrow' /></div></Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}><div className='zetamed_home_clinic_dashboard'> Appointment for {dayjs().format('DD MMMM YYYY')}</div>
                  <hr />
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Grid container>
                      <Grid item xs={12} sm={12} md={12} lg={6} xl={6} ></Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
            </Grid>

          </Grid>
        </div>
      ) : (
        ""
      )}
      {toggledetail === 2 ? (
        <>
          <AddPatient />
        </>
      ) : (
        ""
      )}
      {toggledetail === 3 ? (
        <>
          <FullCalender />
        </>
      ) : (
        ""
      )}
      {toggledetail === 4 ? (
        <>
          <AddPrescriptionHome />
        </>
      ) : (
        ""
      )}
      {toggledetail === 5 ? (
        <>
          <PatientList />
        </>
      ) : (
        ""
      )}




    </div>
  )
}

export default Homepage