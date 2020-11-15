import React from 'react';
import { Row, Col, Grid } from 'rsuite';
import { Actuator } from './components';

import 'rsuite/dist/styles/rsuite-dark.css';

function App() {
    return (
        <div>
            <Grid fluid>
                <Row>
                    <Col lg={6}></Col>
                    <Col lg={12}>
                        <Actuator name={'Atuador'}></Actuator>
                    </Col>
                    <Col lg={6}></Col>
                </Row>
            </Grid>
        </div>
    );
}

export default App;
