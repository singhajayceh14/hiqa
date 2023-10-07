import Link from 'next/link';
import React, { memo } from 'react';

import { useApp } from '@/components/App';

function InternationalDetails() {
  const { state } = useApp();
  return (
    <>
      <section className="project-detail">
        <div className="container">
          <div className="lower-content2">
            <div className="row">
              <div className="text-column col-lg-12 col-md-12 col-sm-12">
                <div className="s-about-content wow fadeInRight" data-animation="fadeInRight" data-delay=".2s">
                  <h2 className="text-center">International Opportunities</h2>
                  <p></p>
                  <p>
                    <strong>Embark on a Global Exploration: Free National & International Site Visit Program 🌍</strong>
                  </p>
                  <p>Dear Students,</p>
                  <p>
                    We are thrilled to unveil an extraordinary opportunity that awaits you – a chance to broaden your
                    horizons through our <b>Free National & International Site Visit Program!</b> Imagine immersing
                    yourself in the heart of industries, witnessing innovation in action, and experiencing the dynamism
                    of both national and international businesses – all without any cost!
                  </p>
                  <p>
                    <strong>Program Highlights:</strong>
                  </p>
                  <p>
                    <strong>🛫 National Expeditions:</strong> Get ready to delve into the core of our nation's
                    industries. From cutting-edge technology hubs to traditional craftsmanship, you'll witness the
                    diverse tapestry of our domestic enterprises.
                  </p>
                  <p>
                    <strong>✈️ International Odyssey:</strong> Pack your bags for an awe-inspiring journey across
                    borders! Traverse through industries that are shaping the global landscape. Engage with
                    professionals, understand cross-cultural dynamics, and witness the scale of operations that span
                    continents.
                  </p>
                  <p>
                    <strong>🌐 Networking Galore:</strong> Connect with industry leaders, professionals, and fellow
                    students who share your enthusiasm for learning. Forge connections that might just shape your future
                    endeavours.
                  </p>
                  <p>
                    <strong>🏭 Industry Insights:</strong> Gain a firsthand understanding of how theories and concepts
                    translate into real-world applications. See the machines, meet the minds, and grasp the intricacies
                    that power these industrial giants.
                  </p>
                  <p>
                    <strong>🌟 Eligibility:</strong> This program is open to all our dedicated students who have
                    exhibited a commitment to learning and excellence.
                    <table className="table table-bordered mt-3">
                      <thead>
                        <tr>
                          <th scope="col">S.NO.</th>
                          <th scope="col">Courses</th>
                          <th scope="col" colSpan={6}>
                            ELIGIBLE STUDENT
                          </th>
                          <th scope="col" colSpan={4}>
                            SEAT RESERVATION CRITERIA (% wise)
                          </th>
                        </tr>
                        <tr>
                          <th scope="col"></th>
                          <th scope="col"></th>
                          <th scope="col">12th</th>
                          <th scope="col">ITI</th>
                          <th scope="col">DIP</th>
                          <th scope="col">B.Sc.</th>
                          <th scope="col">BE</th>
                          <th scope="col">ME</th>
                          <th scope="col">General (C1)</th>
                          <th scope="col">Economically Weaker Sections (C2)</th>
                          <th scope="col">Special Consideration (C3)</th>
                          <th scope="col">Others (C4)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th>1</th>
                          <td>NDT Inspector</td>
                          <td>
                            <i className="fa fa-check"></i>
                          </td>
                          <td>
                            <i className="fa fa-check"></i>
                          </td>
                          <td>
                            <i className="fa fa-check"></i>
                          </td>
                          <td>
                            <i className="fa fa-check"></i>
                          </td>
                          <td>
                            <i className="fa fa-check"></i>
                          </td>
                          <td>
                            <i className="fa fa-check"></i>
                          </td>
                          <td>40%</td>
                          <td>25%</td>
                          <td>25%</td>
                          <td>10%</td>
                        </tr>
                        <tr>
                          <th>2</th>
                          <td>Advanced NDT Inspector</td>
                          <td>
                            <i className="fa fa-check"></i>
                          </td>
                          <td>
                            <i className="fa fa-check"></i>
                          </td>
                          <td>
                            <i className="fa fa-check"></i>
                          </td>
                          <td>
                            <i className="fa fa-check"></i>
                          </td>
                          <td>
                            <i className="fa fa-check"></i>
                          </td>
                          <td>
                            <i className="fa fa-check"></i>
                          </td>
                          <td>40%</td>
                          <td>25%</td>
                          <td>25%</td>
                          <td>10%</td>
                        </tr>
                        <tr>
                          <th>3</th>
                          <td>Third Party Inspector</td>
                          <td>
                            <i className="fa fa-times"></i>
                          </td>
                          <td>
                            <i className="fa fa-check"></i>
                          </td>
                          <td>
                            <i className="fa fa-check"></i>
                          </td>
                          <td>
                            <i className="fa fa-check"></i>
                          </td>
                          <td>
                            <i className="fa fa-check"></i>
                          </td>
                          <td>
                            <i className="fa fa-check"></i>
                          </td>
                          <td>40%</td>
                          <td>25%</td>
                          <td>25%</td>
                          <td>10%</td>
                        </tr>
                        <tr>
                          <th>4</th>
                          <td>Civil Quality Assurance Inspector</td>
                          <td>
                            <i className="fa fa-times"></i>
                          </td>
                          <td>
                            <i className="fa fa-check"></i>
                          </td>
                          <td>
                            <i className="fa fa-check"></i>
                          </td>
                          <td>
                            <i className="fa fa-check"></i>
                          </td>
                          <td>
                            <i className="fa fa-check"></i>
                          </td>
                          <td>
                            <i className="fa fa-check"></i>
                          </td>
                          <td>40%</td>
                          <td>25%</td>
                          <td>25%</td>
                          <td>10%</td>
                        </tr>
                        <tr>
                          <th>5</th>
                          <td>Pipeline Quality Assurance Inspector</td>
                          <td>
                            <i className="fa fa-times"></i>
                          </td>
                          <td>
                            <i className="fa fa-check"></i>
                          </td>
                          <td>
                            <i className="fa fa-check"></i>
                          </td>
                          <td>
                            <i className="fa fa-check"></i>
                          </td>
                          <td>
                            <i className="fa fa-check"></i>
                          </td>
                          <td>
                            <i className="fa fa-check"></i>
                          </td>
                          <td>40%</td>
                          <td>25%</td>
                          <td>25%</td>
                          <td>10%</td>
                        </tr>
                        <tr>
                          <th>6</th>
                          <td>Storage Tanks Quality Assurance Inspector</td>
                          <td>
                            <i className="fa fa-times"></i>
                          </td>
                          <td>
                            <i className="fa fa-times"></i>
                          </td>
                          <td>
                            <i className="fa fa-check"></i>
                          </td>
                          <td>
                            <i className="fa fa-check"></i>
                          </td>
                          <td>
                            <i className="fa fa-check"></i>
                          </td>
                          <td>
                            <i className="fa fa-check"></i>
                          </td>
                          <td>40%</td>
                          <td>25%</td>
                          <td>25%</td>
                          <td>10%</td>
                        </tr>
                        <tr>
                          <th>7</th>
                          <td>Pressure Vessels Quality Assurance Inspector</td>
                          <td>
                            <i className="fa fa-times"></i>
                          </td>
                          <td>
                            <i className="fa fa-times"></i>
                          </td>
                          <td>
                            <i className="fa fa-check"></i>
                          </td>
                          <td>
                            <i className="fa fa-check"></i>
                          </td>
                          <td>
                            <i className="fa fa-check"></i>
                          </td>
                          <td>
                            <i className="fa fa-check"></i>
                          </td>
                          <td>40%</td>
                          <td>25%</td>
                          <td>25%</td>
                          <td>10%</td>
                        </tr>
                        <tr>
                          <th>8</th>
                          <td>Boiler Quality Assurance Inspector</td>
                          <td>
                            <i className="fa fa-times"></i>
                          </td>
                          <td>
                            <i className="fa fa-times"></i>
                          </td>
                          <td>
                            <i className="fa fa-check"></i>
                          </td>
                          <td>
                            <i className="fa fa-check"></i>
                          </td>
                          <td>
                            <i className="fa fa-check"></i>
                          </td>
                          <td>
                            <i className="fa fa-check"></i>
                          </td>
                          <td>40%</td>
                          <td>25%</td>
                          <td>25%</td>
                          <td>10%</td>
                        </tr>
                        <tr>
                          <th>9</th>
                          <td>Electrical & Instrumentation QAI </td>
                          <td>
                            <i className="fa fa-times"></i>
                          </td>
                          <td>
                            <i className="fa fa-times"></i>
                          </td>
                          <td>
                            <i className="fa fa-check"></i>
                          </td>
                          <td>
                            <i className="fa fa-check"></i>
                          </td>
                          <td>
                            <i className="fa fa-check"></i>
                          </td>
                          <td>
                            <i className="fa fa-check"></i>
                          </td>
                          <td>40%</td>
                          <td>25%</td>
                          <td>25%</td>
                          <td>10%</td>
                        </tr>
                        <tr>
                          <th>10</th>
                          <td>Rotatory Equipment QAI</td>
                          <td>
                            <i className="fa fa-times"></i>
                          </td>
                          <td>
                            <i className="fa fa-times"></i>
                          </td>
                          <td>
                            <i className="fa fa-check"></i>
                          </td>
                          <td>
                            <i className="fa fa-check"></i>
                          </td>
                          <td>
                            <i className="fa fa-check"></i>
                          </td>
                          <td>
                            <i className="fa fa-check"></i>
                          </td>
                          <td>40%</td>
                          <td>25%</td>
                          <td>25%</td>
                          <td>10%</td>
                        </tr>
                        <tr>
                          <th>11</th>
                          <td>Artificial Intelligence QAI</td>
                          <td>
                            <i className="fa fa-times"></i>
                          </td>
                          <td>
                            <i className="fa fa-times"></i>
                          </td>
                          <td>
                            <i className="fa fa-check"></i>
                          </td>
                          <td>
                            <i className="fa fa-check"></i>
                          </td>
                          <td>
                            <i className="fa fa-check"></i>
                          </td>
                          <td>
                            <i className="fa fa-check"></i>
                          </td>
                          <td>40%</td>
                          <td>25%</td>
                          <td>25%</td>
                          <td>10%</td>
                        </tr>
                      </tbody>
                    </table>
                    <p>Note:</p>
                    <ol type="1">
                      <li>
                        1. Eligible students should be appearing in final year or pass out in their respective classes.
                      </li>
                      <li>
                        2. (C1) General: All students not belonging to Special Consideration criteria and EWS criteria
                        but are listed in any institute in Uttar Pradesh Only.
                      </li>
                      <li>
                        3. (C2) Economically Weaker Sections: Students comes under EWS as per Indian Government.
                        Reference documents must be required/ EWS certificate to be uploaded.
                      </li>
                      <li>
                        4. (C3) Special consideration: Student with single parent or no parents. Students having martyr
                        parent. Students must submit an undertaking by their respective college/institute or by any
                        gazetted officer.
                      </li>
                      <li>
                        5. (C4) Others: Any student who is appearing or passed out. Or any student whose institute does
                        not fall under Uttar Pradesh Territory.
                      </li>
                      <li> 6. All examinations for entrance shall be based on subjects up to 12th Class</li>
                    </ol>
                  </p>
                  <p>
                    <strong>📝 Registration:</strong> Secure your spot by registering at{' '}
                    <Link href={'/register'}>HIQA Register</Link>. Limited seats available, so don't miss out!
                  </p>
                  <p>
                    Embrace this chance to learn beyond the classroom, to explore beyond borders, and to ignite the fire
                    of curiosity within you. Join us in this journey of discovery and growth. Let's embark on this
                    adventure together!
                  </p>
                  <div className="two-column mt-30">
                    <div className="row aling-items-center">
                      <div className="image-column col-xl-6 col-lg-12 col-md-12">
                        <div className="footer-social mt-10">
                          <Link href={state?.setting_data?.facebook_url ?? '#'} title="Facebook">
                            <i className="fab fa-facebook-f" />
                          </Link>
                          <Link href={state?.setting_data?.instagram_url ?? '#'} title="Instagram">
                            <i className="fab fa-instagram" />
                          </Link>
                          <Link href={state?.setting_data?.twitter_url ?? '#'} title="Twitter">
                            <i className="fab fa-twitter" />
                          </Link>
                          <Link href={state?.setting_data?.linkedin_url ?? '#'} title="LinkedIn">
                            <i className="fab fa-linkedin-in" />
                          </Link>
                          <Link href={state?.setting_data?.youtube_url ?? '#'} title="Youtube">
                            <i className="fab fa-youtube" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default memo(InternationalDetails);
