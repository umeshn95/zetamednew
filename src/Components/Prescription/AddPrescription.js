import React, { useState } from 'react'
import Grid from "@mui/material/Grid";
import './styles.scss'
const AddPrescription = () => {
    const [inputField, setInputField] = useState(
       [ {
            Dosage: '',
            Unit: '',
            MorningDose: '',
            Instruction: '',
            Duration:''
        }
        ]
    )

    const handleEvent = (index,event) => {
        const value = [...inputField]
        value[index][event.target.name] = event.target.value
        setInputField(value)
        console.log(inputField)
    }
    
    const handleField = () => {
        setInputField([...inputField,{
            Dosage: '',
            Unit: '',
            MorningDose: '',
            Instruction: '',
            Duration:''
        }])
    }
    const handleRemoveField = (event,index) => {
        const values = [...inputField]
        values.splice(index, 1)
        setInputField(values)
        console.log(index)
    }

  return (
      <div className='prescription_main'>
          <div className='prescription_sub'>
              <Grid container>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                      <Grid container align='center' spacing={1}>
                          <Grid item xs={12} sm={12} md={2.4} lg={2.4} xl={2.4}>
                          <div className='zetamed_prescription_addprescription'>Add Prescription</div>
                          </Grid>
                          <Grid item xs={3} sm={3} md={2.4} lg={2.4} xl={1.2}>
                          <div className='zetamed_prescription_patientname'> <img alt='p1' src="https://img.icons8.com/ios-glyphs/12/000000/user--v1.png"/>Patient Name</div>
                          </Grid>
                          <Grid item xs={3} sm={3} md={2.4} lg={2.4} xl={1.2}>
                          <div className='zetamed_prescription_patientname'><img alt='p2' src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/12/000000/external-doctor-dental-kiranshastry-lineal-kiranshastry.png"/>Doctor Name</div>
                          </Grid>
                          <Grid item xs={3} sm={3} md={2.4} lg={2.4} xl={1.2}>
                          <div className='zetamed_prescription_patientname'><img alt='p3' src="https://img.icons8.com/ios/12/000000/calendar-plus.png"/>Full Date</div>
                          </Grid>
                          <Grid item xs={3} sm={3} md={2.4} lg={2.4} xl={1.2}>
                          <div className='zetamed_prescription_patientname'><img alt='p4' src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/12/000000/external-edit-interface-kiranshastry-lineal-kiranshastry-1.png"/>Change</div>
                          </Grid>
                          <Grid item xs={3} sm={3} md={2.4} lg={2.4} xl={1.2} align='right'>
                          <div className=''> <img alt="img" src="https://img.icons8.com/external-doodle-bomsymbols-/28/000000/external-close-doodle-web-design-device-set-2-doodle-bomsymbols-.png"/></div>
                          </Grid>
                      </Grid>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                      <Grid container>
                          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} style={{display:"flex",alignItems:"center"}}>
                              <div><img src="https://img.icons8.com/stickers/80/000000/user.png" alt='iconsuser'/></div>
                              <div className='zetamed_prescription_patientname1'>Patient Name</div>
                          </Grid>
                          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                              <div className='zetamed_prescription_mobile'> <img src="https://img.icons8.com/external-xnimrodx-lineal-gradient-xnimrodx/19/000000/external-phone-notification-xnimrodx-lineal-gradient-xnimrodx.png" alt='phone' />
                              <div >Mobile</div>
                              </div>

                              <div className='zetamed_prescription_mobile'> <img src="https://img.icons8.com/external-xnimrodx-lineal-gradient-xnimrodx/19/000000/external-email-contact-us-xnimrodx-lineal-gradient-xnimrodx-4.png" alt='email'/> email</div>
                          </Grid>
                            </Grid>
                  </Grid>

                  {inputField.map((field,index) =>
                      <>
                         {index>=1?<Grid item xs={12} sm={12} md={12} lg={9} xl={9}>
                      <Grid container>
                          <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                              <Grid container>
                                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}  >
                                  </Grid>
                                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className='zetamed_prescription_table'>
                                                  <div >
                                                      <select className='zetamed_prescription_round1' type='text'  placeholder='Drug Name' name="Dosage" value={field.Dosage} onChange={(event)=>handleEvent(index,event)} >
                                                      <option value="">--Add Drug--</option>
    <option value="dog">Dog</option>
    <option value="cat">Cat</option>
    <option value="hamster">Hamster</option>
    <option value="parrot">Parrot</option>
    <option value="spider">Spider</option>
    <option value="goldfish">Goldfish</option>
                                                      </select>
                                  </div>

                                  </Grid>
                            </Grid>
                                      </Grid>
                                      


                          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                                          <Grid container>
                                          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}  >
                                  </Grid>
                                              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className='zetamed_prescription_table' >
                                                  
                                      
                                                  <div style={{display:"flex",flexDirection:'column',gap:"10px"}}>
                                                  <div>
                                                  <input className='zetamed_prescription_round' type='text' placeholder='Dosage(ex.10mg)' name="Unit" value={field.Unit} onChange={(event)=>handleEvent(index,event)} >
                                                </input>
                                                  
                                                 </div>


                                                  <div>
                                                  <select className='zetamed_prescription_round1' type='text' placeholder='' name="MorningDose" value={field.MorningDose} onChange={(event)=>handleEvent(index,event)} >
                                                      <option value="">Select</option>
    <option value="Morning">Morning</option>
    <option value="Afternoon">Afternoon</option>
    <option value="Evening">Evening</option>
   
                                                      </select>
                                  </div>   
                                             </div>
                                  </Grid>
                                 
                            </Grid>
                                      </Grid>
                                      


                          <Grid item xs={12} sm={12} md={2} lg={2.5} xl={2.5}>
                          <Grid container>
                                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                  </Grid>
                                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className='zetamed_prescription_table'>
                                  <select className='zetamed_prescription_round1' type='text' placeholder='Drug Name' name="Instruction" value={field.Instruction} onChange={(event)=>handleEvent(index,event)} >
                                                      <option value="">Select</option>
    <option value="Before Food">Before Food</option>
    <option value="After Food">After Food</option>
 
                                                      </select>
                                  </Grid>
                            </Grid>
                                      </Grid>
                                      



                          <Grid item xs={12} sm={12} md={3} lg={2.5} xl={2.5}>
                          <Grid container>
                                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                  </Grid>
                                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className='zetamed_prescription_table'>
                                  <select className='zetamed_prescription_round1' type='text' placeholder='Drug Name' name="Duration" value={field.Duration} onChange={(event)=>handleEvent(index,event)} >
                                                      <option value="">Select</option>
    <option value="One Day">One Day</option>
    <option value="Two Day">Two Day</option>
    <option value="Three Day">Three Day</option>
    <option value="Four Day">Four Day</option>
    <option value="Five Day">Five Day</option>
    <option value="Six Day">Six Day</option>
                                                      </select>
                                  </Grid>
                                          </Grid>
                                          



                          
                    </Grid>
                          <Grid item xs={12} sm={12} md={1} lg={1} xl={1}>
                                          <Grid container>
                                          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                  </Grid>
                                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} onClick={()=> handleField()}> <div className='zetamed_prescription_table'><img alt='pl' src="https://img.icons8.com/officel/20/000000/plus.png"/></div></Grid>
                                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} onClick={(index,event)=> handleRemoveField(index,event)}> <div className='zetamed_prescription_table'><img alt='min' src="https://img.icons8.com/officel/20/000000/minus.png"/></div></Grid>
                                </Grid>
                          </Grid>
                          </Grid>
                  </Grid> :
                  
                              
                              <Grid item xs={12} sm={12} md={12} lg={9} xl={9}>
                      <Grid container>
                          <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                              <Grid container>
                                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}  >
                                      <div className='zetamed_prescription_add_drug'>Drug</div>
                                  </Grid>
                                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className='zetamed_prescription_table'>
                                                  <div >
                                                      <select className='zetamed_prescription_round1' type='text'  placeholder='Drug Name' name="Dosage" value={field.Dosage} onChange={(event)=>handleEvent(index,event)} >
                                                      <option value="">--Add Drug--</option>
    <option value="dog">Dog</option>
    <option value="cat">Cat</option>
    <option value="hamster">Hamster</option>
    <option value="parrot">Parrot</option>
    <option value="spider">Spider</option>
    <option value="goldfish">Goldfish</option>
                                                      </select>
                                  </div>

                                  </Grid>
                            </Grid>
                                      </Grid>
                                      


                          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                                          <Grid container>
                                          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}  >
                                                  <div className='zetamed_prescription_add_drug'>Dosage & Frequency</div>
                                  </Grid>
                                              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className='zetamed_prescription_table' >
                                                  
                                      
                                                  <div style={{display:"flex",flexDirection:'column',gap:"10px"}}>
                                                  <div>
                                                  <input className='zetamed_prescription_round' type='text' placeholder='Dosage(ex.10mg)' name="Unit" value={field.Unit} onChange={(event)=>handleEvent(index,event)} >
                                                </input>
                                                  
                                                 </div>


                                                  <div>
                                                  <select className='zetamed_prescription_round1' type='text' placeholder='' name="MorningDose" value={field.MorningDose} onChange={(event)=>handleEvent(index,event)} >
                                                      <option value="">Select</option>
    <option value="Morning">Morning</option>
    <option value="Afternoon">Afternoon</option>
    <option value="Evening">Evening</option>
   
                                                      </select>
                                  </div>   
                                             </div>
                                  </Grid>
                                 
                            </Grid>
                                      </Grid>
                                      


                          <Grid item xs={12} sm={12} md={2} lg={2.5} xl={2.5}>
                          <Grid container>
                                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                  <div className='zetamed_prescription_add_drug'>Instruction</div>
                                  </Grid>
                                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className='zetamed_prescription_table'>
                                  <select className='zetamed_prescription_round1' type='text' placeholder='Drug Name' name="Instruction" value={field.Instruction} onChange={(event)=>handleEvent(index,event)} >
                                                      <option value="">Select</option>
    <option value="Before Food">Before Food</option>
    <option value="After Food">After Food</option>
 
                                                      </select>
                                  </Grid>
                            </Grid>
                                      </Grid>
                                      



                          <Grid item xs={12} sm={12} md={3} lg={2.5} xl={2.5}>
                          <Grid container>
                                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                  <div className='zetamed_prescription_add_drug'>Duration</div>
                                  </Grid>
                                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className='zetamed_prescription_table'>
                                  <select className='zetamed_prescription_round1' type='text' placeholder='Drug Name' name="Duration" value={field.Duration} onChange={(event)=>handleEvent(index,event)} >
                                                      <option value="">Select</option>
    <option value="One Day">One Day</option>
    <option value="Two Day">Two Day</option>
    <option value="Three Day">Three Day</option>
    <option value="Four Day">Four Day</option>
    <option value="Five Day">Five Day</option>
    <option value="Six Day">Six Day</option>
                                                      </select>
                                  </Grid>
                                          </Grid>
                                          



                          
                    </Grid>
                          <Grid item xs={12} sm={12} md={1} lg={1} xl={1}>
                                          <Grid container>
                                          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                  <div className='zetamed_prescription_add_drug'>Add/Remove</div>
                                  </Grid>
                                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} onClick={()=> handleField()}> <div className='zetamed_prescription_table'><img alt='plus' src="https://img.icons8.com/officel/20/000000/plus.png"/></div></Grid>
                                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} onClick={(index,event)=> handleRemoveField(index,event)}> <div className='zetamed_prescription_table'><img alt='minus' src="https://img.icons8.com/officel/20/000000/minus.png"/></div></Grid>
                                </Grid>
                          </Grid>
                          </Grid>
                  </Grid>}
                  
                      </>
               )}
                  

{/* 
                  <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
                      <Grid container>
                          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}
                          >
                              <div>Most Used Drug</div>
                              <div>Add Drug</div>
                          </Grid>
                          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}
                          >
                              <div>Search Drug</div>
                              <div>Search Bar</div>
                          </Grid>
                      </Grid>
                      
                  </Grid> */}
                  
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                      <button className='button-66'>Save Prescription</button>  
                  </Grid>
              </Grid>
          </div>
          
    </div>
  )
}

export default AddPrescription