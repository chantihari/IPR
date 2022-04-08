import PropTypes from "prop-types"
import React, { useEffect, useRef } from "react"
import { connect } from "react-redux"
// //Import Scrollbar
import SimpleBar from "simplebar-react"

// MetisMenu
import MetisMenu from "metismenujs"
import { withRouter } from "react-router-dom"
import { Link } from "react-router-dom"

//i18n
import { withTranslation } from "react-i18next"

const SidebarContent = props => {
  const ref = useRef()
  // Use ComponentDidMount and ComponentDidUpdate method symultaniously

  console.log("defaultAdministration ", props.defaultAdministration)
  useEffect(() => {
    const pathName = props.location.pathname

    const initMenu = () => {
      new MetisMenu("#side-menu")
      let matchingMenuItem = null
      const ul = document.getElementById("side-menu")
      const items = ul.getElementsByTagName("a")
      for (let i = 0; i < items.length; ++i) {
        if (pathName === items[i].pathname) {
          matchingMenuItem = items[i]
          break
        }
      }
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem)
      }
    }
    initMenu()
  }, [props.location.pathname])

  useEffect(() => {
    ref.current.recalculate()
  })

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300
      }
    }
  }

  function activateParentDropdown(item) {
    item.classList.add("active")
    const parent = item.parentElement
    const parent2El = parent.childNodes[1]
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show")
    }

    if (parent) {
      parent.classList.add("mm-active")
      const parent2 = parent.parentElement

      if (parent2) {
        parent2.classList.add("mm-show") // ul tag

        const parent3 = parent2.parentElement // li tag

        if (parent3) {
          parent3.classList.add("mm-active") // li
          parent3.childNodes[0].classList.add("mm-active") //a
          const parent4 = parent3.parentElement // ul
          if (parent4) {
            parent4.classList.add("mm-show") // ul
            const parent5 = parent4.parentElement
            if (parent5) {
              parent5.classList.add("mm-show") // li
              parent5.childNodes[0].classList.add("mm-active") // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false
    }
    scrollElement(item);
    return false
  }

  return (
    <React.Fragment>
      <SimpleBar style={{ maxHeight: "100%" }} ref={ref}>
        <div id="sidebar-menu">

          {/* <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">{props.t("Main")} </li>
            <li>
              <Link to="#" className="waves-effect">
                <i className="ti-home"></i>
                <span className="badge rounded-pill bg-primary float-end">2</span>
                <span>{props.t("Dashboard")}</span>
              </Link>
            </li>

            <li>
              <Link to="/calendar" className=" waves-effect">
                <i className="ti-calendar"></i>
                <span>{props.t("Calendar")}</span>
              </Link>
            </li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="ti-email"></i>
                <span>{props.t("Email")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/email-inbox">{props.t("Inbox")}</Link>
                </li>
                <li>
                  <Link to="/email-read">{props.t("Email Read")} </Link>
                </li>
                <li>
                  <Link to="/email-compose">{props.t("Email Compose")} </Link>
                </li>
              </ul>
            </li>

            <li className="menu-title">{props.t("Components")}</li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="ti-package"></i>
                <span>{props.t("UI Elements")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/ui-alerts">{props.t("Alerts")}</Link>
                </li>
                <li>
                  <Link to="/ui-buttons">{props.t("Buttons")}</Link>
                </li>
                <li>
                  <Link to="/ui-cards">{props.t("Cards")}</Link>
                </li>
                <li>
                  <Link to="/ui-carousel">{props.t("Carousel")}</Link>
                </li>
                <li>
                  <Link to="/ui-dropdowns">{props.t("Dropdowns")}</Link>
                </li>
                <li>
                  <Link to="/ui-grid">{props.t("Grid")}</Link>
                </li>
                <li>
                  <Link to="/ui-images">{props.t("Images")}</Link>
                </li>
                <li>
                  <Link to="/ui-lightbox">{props.t("Lightbox")}</Link>
                </li>
                <li>
                  <Link to="/ui-modals">{props.t("Modals")}</Link>
                </li>
                <li>
                  <Link to="/ui-rangeslider">{props.t("Range Slider")}</Link>
                </li>
                <li>
                  <Link to="/ui-session-timeout">
                    {props.t("Session Timeout")}
                  </Link>
                </li>
                <li>
                  <Link to="/ui-progressbars">{props.t("Progress Bars")}</Link>
                </li>
                <li>
                  <Link to="/ui-sweet-alert">{props.t("Sweet-Alert")}</Link>
                </li>
                <li>
                  <Link to="/ui-tabs-accordions">
                    {props.t("Tabs & Accordions")}
                  </Link>
                </li>
                <li>
                  <Link to="/ui-typography">{props.t("Typography")}</Link>
                </li>
                <li>
                  <Link to="/ui-video">{props.t("Video")}</Link>
                </li>
                <li>
                  <Link to="/ui-general">{props.t("General")}</Link>
                </li>
                <li>
                  <Link to="/ui-colors">{props.t("Colors")}</Link>
                </li>
                <li>
                  <Link to="/ui-rating">{props.t("Rating")}</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/#" className="waves-effect">
                <i className="ti-receipt"></i>
                <span className="badge rounded-pill bg-success float-end">6</span>
                <span>{props.t("Forms")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/form-elements">{props.t("Form Elements")}</Link>
                </li>
                <li>
                  <Link to="/form-validation">{props.t("Form Validation")}</Link>
                </li>
                <li>
                  <Link to="/form-advanced">{props.t("Form Advanced")}</Link>
                </li>
                <li>
                  <Link to="/form-editors">{props.t("Form Editors")}</Link>
                </li>
                <li>
                  <Link to="/form-uploads">{props.t("Form File Upload")} </Link>
                </li>
                <li>
                  <Link to="/form-xeditable">{props.t("Form Xeditable")}</Link>
                </li>
                <li>
                  <Link to="/form-repeater">{props.t("Form Repeater")}</Link>
                </li>
                <li>
                  <Link to="/form-wizard">{props.t("Form Wizard")}</Link>
                </li>
                <li>
                  <Link to="/form-mask">{props.t("Form Mask")}</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="ti-pie-chart"></i>
                <span>{props.t("Charts")}</span>
              </Link>

              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/chartist-charts">{props.t("Chartist Chart")}</Link>
                </li>
                <li>
                  <Link to="/e-charts">{props.t("E Chart")}</Link>
                </li>
                <li>
                  <Link to="/chartjs-charts">{props.t("Chartjs Chart")}</Link>
                </li>
                <li>
                  <Link to="apex-charts">{props.t("Apex charts")}</Link>
                </li>
                <li>
                  <Link to="sparkline-charts">{props.t("Sparkline Chart")}</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="ti-view-grid"></i>
                <span>{props.t("Tables")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/tables-basic">{props.t("Basic Tables")}</Link>
                </li>
                <li>
                  <Link to="/tables-datatable">{props.t("Data Tables")}</Link>
                </li>
                <li>
                  <Link to="/tables-responsive">
                    {props.t("Responsive Table")}
                  </Link>
                </li>
                <li>
                  <Link to="/tables-editable">{props.t("Editable Table")}</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="ti-face-smile"></i>
                <span>{props.t("Icons")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/icons-materialdesign">
                    {props.t("Material Design")}
                  </Link>
                </li>
                <li>
                  <Link to="/icons-fontawesome">{props.t("Font awesome")}</Link>
                </li>
                <li>
                  <Link to="/icons-ion">{props.t("Ion Icons")}</Link>
                </li>
                <li>
                  <Link to="/icons-themify">{props.t("Themify Icons")}</Link>
                </li>
                <li>
                  <Link to="/icons-dripicons">{props.t("Dripicons")}</Link>
                </li>
                <li>
                  <Link to="/icons-typicons">{props.t("Typicons Icons")}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#">
                <i className="ti-location-pin"></i>
                <span className="badge rounded-pill bg-danger float-end">2</span>
                <span>{props.t("Maps")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/maps-google">{props.t("Google Maps")}</Link>
                </li>
                <li>
                  <Link to="/maps-vector">{props.t("Vector Maps")}</Link>
                </li>
                <li>
                  <Link to="/maps-leaflet">{props.t("Leaflet Maps")}</Link>
                </li>
              </ul>
            </li>

            <li className="menu-title">Extras</li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="ti-archive"></i>
                <span>{props.t("Authentication")}</span>

              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/pages-login">{props.t("Login")}</Link>
                </li>
                <li>
                  <Link to="/pages-login-2">{props.t("Login")} 2</Link>
                </li>
                <li>
                  <Link to="/pages-register">{props.t("Register")}</Link>
                </li>
                <li>
                  <Link to="/pages-register-2">{props.t("Register")} 2</Link>
                </li>
                <li>
                  <Link to="/page-recoverpw">
                    {props.t("Recover Password")}
                  </Link>
                </li>
                <li>
                  <Link to="/page-recoverpw-2">
                    {props.t("Recover Password")} 2
                  </Link>
                </li>
                <li>
                  <Link to="/auth-lock-screen">{props.t("Lock screen")}</Link>
                </li>
                <li>
                  <Link to="/auth-lock-screen-2">
                    {props.t("Lock screen")} 2
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="ti-support"></i>
                <span>{props.t("Extra Pages")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="pages-timeline">{props.t("Timeline")}</Link>
                </li>
                <li>
                  <Link to="pages-invoice">{props.t("Invoice")}</Link>
                </li>
                <li>
                  <Link to="pages-directory">{props.t("Directory")}</Link>
                </li>
                <li>
                  <Link to="/pages-starter">{props.t("Starter Page")}</Link>
                </li>
                <li>
                  <Link to="pages-404">{props.t("Error 404")}</Link>
                </li>
                <li>
                  <Link to="pages-500">{props.t("Error 500")}</Link>
                </li>
                <li>
                  <Link to="pages-pricing">{props.t("Pricing")}</Link>
                </li>
                <li>
                  <Link to="pages-gallery">{props.t("Gallery")}</Link>
                </li>
                <li>
                  <Link to="pages-maintenance">{props.t("Maintenance")}</Link>
                </li>
                <li>
                  <Link to="pages-comingsoon">{props.t("Coming Soon")}</Link>
                </li>
                <li>
                  <Link to="pages-faqs">{props.t("FAQs")}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="ti-bookmark-alt"></i>
                <span> {props.t("Email Templates")} </span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/email-template-basic">{props.t("Basic Action Email")}</Link>
                </li>
                <li>
                  <Link to="/email-template-Alert">{props.t("Alert Email")}</Link>
                </li>
                <li>
                  <Link to="/email-template-Billing">{props.t("Billing Email")}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="ti-more"></i>
                <span>{props.t("Multi Level")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="true">
                <li>
                  <Link to="/#">{props.t("Level 1.1")}</Link>
                </li>
                <li>
                  <Link to="/#" className="has-arrow">
                    {props.t("Level 1.2")}
                  </Link>
                  <ul className="sub-menu" aria-expanded="true">
                    <li>
                      <Link to="/#">{props.t("Level 2.1")}</Link>
                    </li>
                    <li>
                      <Link to="/#">{props.t("Level 2.2")}</Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul> */}


          {props.defaultAdministration == "software" ?
            <ul className="metismenu list-unstyled" id="side-menu">

              <li>
                <Link to="/#" className="has-arrow waves-effect">
                  <i className="fas fa-tv"></i>
                  <span>System Setup</span>
                </Link>
                <ul className="sub-menu" aria-expanded="false">
                  <li>
                    <Link to="/config">Config Management</Link>
                  </li>
                  <li>
                    <Link to="/remote">Remote Support </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="#" className="waves-effect">
                  <i className="fas fa-tools"></i>
                  <span>Admin Tools</span>
                </Link>
              </li>
              <li>
                <Link to="#" className="waves-effect">
                  <i className="fas fa-server"></i>
                  <span>Server Management</span>
                </Link>
              </li>
              <li>
                <Link to="#" className="waves-effect">
                  <i className="fas fa-database"></i>
                  <span>Database Management</span>
                </Link>
              </li>
              <li>
                <Link to="#" className="waves-effect">
                  <i className="fas fa-network-wired"></i>
                  <span>Device Management</span>
                </Link>
              </li>
              <li>
                <Link to="#" className="waves-effect">
                  <i className="fas fa-tasks"></i>
                  <span>Security Management</span>
                </Link>
              </li>
              <li>
                <Link to="/#" className="has-arrow waves-effect">
                  <i className="fas fa-project-diagram"></i>
                  <span>Remote Access</span>
                </Link>
                <ul className="sub-menu" aria-expanded="false">
                  <li>
                    <Link to="#">External IP's</Link>
                  </li>
                  <li>
                    <Link to="#">Two Factor Auth</Link>
                  </li>
                  <li>
                    <Link to="#">Verification Codes</Link>
                  </li>
                  <li>
                    <Link to="#">Trusted Browsers</Link>
                  </li>
                  <li>
                    <Link to="#">Backup Phone No</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="#" className="waves-effect">
                  <i className="fas fa-desktop"></i>
                  <span>System Monitoring</span>
                </Link>
              </li>
              <li>
                <Link to="/#" className="has-arrow waves-effect">
                  <i className="fas fa-notes-medical"></i>
                  <span>Maintainence</span>
                </Link>
                <ul className="sub-menu" aria-expanded="false">
                  <li>
                    <Link to="#">Backup Data</Link>
                  </li>
                  <li>
                    <Link to="#">Update System</Link>
                  </li>
                  <li>
                    <Link to="#">Upgrade</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="#" className="waves-effect">
                  <i className="fas fa-cubes"></i>
                  <span>Extensions</span>
                </Link>
              </li>
              <li>
                <Link to="#" className="waves-effect">
                  <i className="fas fa-cogs"></i>
                  <span>Global Settings</span>
                </Link>
              </li>
              <li>
                <Link to="#" className="waves-effect">
                  <i className="fas fa-clipboard-list"></i>
                  <span>Legal Documents</span>
                </Link>
              </li>
              <li>
                <Link to="#" className="waves-effect">
                  <i className="fas fa-lock-open"></i>
                  <span>Third Party</span>
                </Link>
              </li>

            </ul>
            : props.defaultAdministration == "hospital" ?
              <ul className="metismenu list-unstyled" id="side-menu">

                <li>
                  <Link to="/#" className="has-arrow waves-effect">
                    <i className="fas fa-cogs"></i>
                    <span>Institutional Settings</span>
                  </Link>
                  <ul className="sub-menu" aria-expanded="false">
                    <li>
                      <Link to="#">Default Facility</Link>
                    </li>
                    <li>
                      <Link to="#">Print Management</Link>
                    </li>
                    <li>
                      <Link to="#">Test Config</Link>
                    </li>
                    <li>
                      <Link to="#">OrderTransmittal</Link>
                    </li>

                  </ul>
                </li>

                <li>
                  <Link to="#" className="waves-effect">
                    <i className="far fa-address-book"></i>
                    <span>Address Book</span>
                  </Link>
                </li>
                <li>
                  <Link to="#" className="waves-effect">
                    <i className="fas fa-blender-phone"></i>
                    <span>Telephony</span>
                  </Link>
                </li>

                <li>
                  <Link to="/#" className="has-arrow waves-effect">
                    <i className="fas fa-users-cog"></i>
                    <span>User Management</span>
                  </Link>
                  <ul className="sub-menu" aria-expanded="false">
                    <li>
                      <Link to="#">Staff</Link>
                    </li>
                    <li>
                      <Link to="#">User</Link>
                    </li>
                    <li>
                      <Link to="#">Assign Licenses</Link>
                    </li>

                  </ul>
                </li>
                <li>
                  <Link to="#" className="waves-effect">
                    <i className="fas fa-desktop"></i>
                    <span>Authentication Settings</span>
                  </Link>
                </li>
                <li>
                  <Link to="/#" className="has-arrow waves-effect">
                    <i className="fas fa-project-diagram"></i>
                    <span>Access Control</span>
                  </Link>
                  <ul className="sub-menu" aria-expanded="false">
                    <li>
                      <Link to="#">Roles</Link>
                    </li>
                    <li>
                      <Link to="#">Facilities</Link>
                    </li>
                    <li>
                      <Link to="#">Assign access</Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="#" className="waves-effect">
                    <i className="fas fa-cubes"></i>
                    <span>Security Policies</span>
                  </Link>
                </li>
                <li>
                  <Link to="/#" className="has-arrow waves-effect">
                    <i className="fas fa-comment-dots"></i>
                    <span>Communications</span>
                  </Link>
                  <ul className="sub-menu" aria-expanded="false">
                    <li>
                      <Link to="#">Staff</Link>
                    </li>
                    <li>
                      <Link to="#">User</Link>
                    </li>
                    <li>
                      <Link to="#">Assign Licenses</Link>
                    </li>

                  </ul>
                </li>
                <li>
                  <Link to="#" className="waves-effect">
                    <i className="fas fa-file-code"></i>
                    <span>Coding</span>
                  </Link>
                </li>
                <li>
                  <Link to="#" className="waves-effect">
                    <i className="fas fa-globe-asia"></i>
                    <span>HL7</span>
                  </Link>
                </li>

              </ul> :

              <ul className="metismenu list-unstyled" id="side-menu">

                <li>
                  <Link to="#" className="waves-effect">
                    <i className="fas fa-cogs"></i>
                    <span>Settings</span>
                  </Link>
                </li>

                <li>
                  <Link to="#" className="waves-effect">
                    <i className="fas fa-hospital-user"></i>
                    <span>Manage Patients</span>
                  </Link>
                </li>
                <li>
                  <Link to="#" className="waves-effect">
                    <i className="fas fa-users"></i>
                    <span>Patient Records</span>
                  </Link>
                </li>

                <li>
                  <Link to="/#" className="has-arrow waves-effect">
                    <i className="fas fa-id-badge"></i>
                    <span>OutPatient</span>
                  </Link>
                  <ul className="sub-menu" aria-expanded="false">
                    <li>
                      <Link to="#">Appointment</Link>
                    </li>
                    <li>
                      <Link to="#">Scheduling</Link>
                    </li>
                    <li>
                      <Link to="#">Notifications</Link>
                    </li>

                  </ul>
                </li>
                <li>
                  <Link to="#" className="waves-effect">
                    <i className="fas fa-bed"></i>
                    <span>Past Encounters</span>
                  </Link>
                </li>
                <li>
                  <Link to="#" className="waves-effect">
                    <i className="fas fa-comment-alt"></i>
                    <span>Chatbot Integration</span>
                  </Link>
                </li>
                <li>
                  <Link to="#" className="waves-effect">
                    <i className="fas fa-book"></i>
                    <span>Booking Assistant</span>
                  </Link>
                </li>
                <li>
                  <Link to="#" className="waves-effect">
                    <i className="fas fa-user-tie"></i>
                    <span>Consultation</span>
                  </Link>
                </li>
                <li>
                  <Link to="#" className="waves-effect">
                    <i className="fas fa-file-contract"></i>
                    <span>Appointment Reports</span>
                  </Link>
                </li>
                <li>
                  <Link to="/#" className="has-arrow waves-effect">
                    <i className="fas fa-diagnoses"></i>
                    <span>Inpatients</span>
                  </Link>
                  <ul className="sub-menu" aria-expanded="false">
                    <li>
                      <Link to="#">Records</Link>
                    </li>
                    <li>
                      <Link to="#">Settings</Link>
                    </li>
                    <li>
                      <Link to="#">Create Encounter</Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="#" className="waves-effect">
                    <i className="fas fa-chart-pie"></i>
                    <span>Flow Sheet</span>
                  </Link>
                </li>
                <li>
                  <Link to="#" className="waves-effect">
                    <i className="fas fa-cubes"></i>
                    <span>Survey</span>
                  </Link>
                </li>
                <li>
                  <Link to="#" className="waves-effect">
                    <i className="fas fa-file-audio"></i>
                    <span>Referral Management</span>
                  </Link>
                </li>
                <li>
                  <Link to="/#" className="has-arrow waves-effect">
                    <i className="fas fa-building"></i>
                    <span>Theatres</span>
                  </Link>
                  <ul className="sub-menu" aria-expanded="false">
                    <li>
                      <Link to="#">Lab/Images</Link>
                    </li>
                    <li>
                      <Link to="#">Settings</Link>
                    </li>
                    <li>
                      <Link to="#">Lab Records</Link>
                    </li>
                    <li>
                      <Link to="#">Lab Results</Link>
                    </li>
                    <li>
                      <Link to="#">Imaging Orders</Link>
                    </li>
                    <li>
                      <Link to="#">Imaging Results</Link>
                    </li>

                  </ul>
                </li>

                <li>
                  <Link to="/#" className="has-arrow waves-effect">
                    <i className="fas fa-user-shield"></i>
                    <span>EPMA</span>
                  </Link>
                  <ul className="sub-menu" aria-expanded="false">
                    <li>
                      <Link to="#">Task Management</Link>
                    </li>
                    <li>
                      <Link to="#">Forms</Link>
                    </li>
                    <li>
                      <Link to="#">Documents</Link>
                    </li>
                    <li>
                      <Link to="#">Templates</Link>
                    </li>
                    <li>
                      <Link to="#">Questionaries</Link>
                    </li>
                    <li>
                      <Link to="#">Analytics</Link>
                    </li>
                    <li>
                      <Link to="#">Patient Portal</Link>
                    </li>

                  </ul>
                </li>
               

              </ul>

          }


        </div>
      </SimpleBar>
    </React.Fragment>
  )
}

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
  defaultAdministration: PropTypes.any
}

const mapStateToProps = state => {
  return { ...state.Layout }
}

// export default connect(mapStateToProps, {
// })(Dashboard)


export default connect(mapStateToProps, {
})(withRouter(withTranslation()(SidebarContent)))
