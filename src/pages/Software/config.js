import React from "react"
import MetaTags from 'react-meta-tags';
import {
    Container,
    Row,
    Col,
    Button
} from "reactstrap"
import Form from "@rjsf/material-ui";
import newSection from "./config.json";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

const ConfigManagement = () => {
    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Configuration Management</title>
                </MetaTags>
                <Container fluid>
                    {/* Render Breadcrumbs */}
                    <Breadcrumbs maintitle="IPR" title="System Setup" breadcrumbItem="Config Management" />

                    <Row className="align-items-center">
                        <Col md={3}>
                            <Form schema={newSection}>
                                <div>
                                    <Button
                                        type="submit"
                                        color="success"
                                        className="btn-block"
                                    >
                                        Submit
                                    </Button>
                                </div>
                            </Form>
                        </Col>
                    </Row>


                </Container>
            </div>
        </React.Fragment>
    )
}

export default ConfigManagement
