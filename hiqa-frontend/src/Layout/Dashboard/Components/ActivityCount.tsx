import React from 'react';
import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

import styles from '@/styles/Components/Dashboard/OrderCount.module.scss';
import { useRequest, useLoading } from '@/components/App';
import { useCommonReducer } from '@/components/App/reducer';

const CountBody = styled.div`
  background: ${(props: any) => props.color || 'white'};
`;
const CountText = styled.span`
  color: ${props => props.color || 'white'};
`;
const CountDetail = styled.div`
  border-top: none;
  border: solid 1px ${props => props.color || 'white'};
`;
function OrderCount() {
  const { loading } = useRequest();
  const { ButtonLoader } = useLoading();
  const { state } = useCommonReducer();

  return (
    <div className={styles.orderCount}>
      <Row>
        {/* API Request Today */}
        <Col xl={3} lg={4} md={4}>
          <CountBody color="green">
            <div className={styles.countNumber}>
              <span className={`${styles.orderIcon}`}>
                <i className="fa fa-gauge-high"></i>
              </span>
              <div className={styles.orderText}>
                <strong className={styles.brightBlueText}>
                  {loading?.DASHBOARD_FETCH_ORDERS_COUNT_LOADING ? <ButtonLoader /> : state?.new_loads}{' '}
                </strong>
                <span>
                  <p className={styles.requestCount}>0</p>
                  <p className={styles.requestMsg}>API Request Today</p>
                </span>
              </div>
            </div>
          </CountBody>
          <CountDetail className={`${styles.countDetail}`} color="green">
            <CountText color="green" className={styles.countText}>
              View Details
            </CountText>
            <CountText color="green" className={styles.countIcon}>
              <i className="fa fa-arrow-right"></i>
            </CountText>
          </CountDetail>
        </Col>
        {/* Invalid Posts Today */}
        <Col xl={3} lg={4} md={4}>
          <CountBody color="#002e6e">
            <div className={styles.countNumber}>
              <span className={`${styles.orderIcon}`}>
                <i className="fa fa-download"></i>
              </span>
              <div className={styles.orderText}>
                <strong className={styles.brightBlueText}>
                  {loading?.DASHBOARD_FETCH_ORDERS_COUNT_LOADING ? <ButtonLoader /> : state?.new_loads}{' '}
                </strong>
                <span>
                  <p className={styles.requestCount}>0</p>
                  <p className={styles.requestMsg}>Invalid Posts Today</p>
                </span>
              </div>
            </div>
          </CountBody>
          <CountDetail className={`${styles.countDetail}`} color="#002e6e">
            <CountText color="#002e6e" className={styles.countText}>
              View Details
            </CountText>
            <CountText color="#002e6e" className={styles.countIcon}>
              <i className="fa fa-arrow-right"></i>
            </CountText>
          </CountDetail>
        </Col>
        {/* API Errors Today */}
        <Col xl={3} lg={4} md={4}>
          <CountBody color="#c1b46b">
            <div className={styles.countNumber}>
              <span className={`${styles.orderIcon}`}>
                <i className="fa fa-triangle-exclamation"></i>
              </span>
              <div className={styles.orderText}>
                <strong className={styles.brightBlueText}>
                  {loading?.DASHBOARD_FETCH_ORDERS_COUNT_LOADING ? <ButtonLoader /> : state?.new_loads}{' '}
                </strong>
                <span>
                  <p className={styles.requestCount}>0</p>
                  <p className={styles.requestMsg}>API Errors Today</p>
                </span>
              </div>
            </div>
          </CountBody>
          <CountDetail className={`${styles.countDetail}`} color="#c1b46b">
            <CountText color="#c1b46b" className={styles.countText}>
              View Details
            </CountText>
            <CountText color="#c1b46b" className={styles.countIcon}>
              <i className="fa fa-arrow-right"></i>
            </CountText>
          </CountDetail>
        </Col>
        <Col xl={3} lg={4} md={4}>
          <CountBody color="#fa3e3e">
            <div className={styles.countNumber}>
              <span className={`${styles.orderIcon}`}>
                <i className="fa fa-briefcase-medical"></i>
              </span>
              <div className={styles.orderText}>
                <strong className={styles.brightBlueText}>
                  {loading?.DASHBOARD_FETCH_ORDERS_COUNT_LOADING ? <ButtonLoader /> : state?.new_loads}{' '}
                </strong>
                <span>
                  <p className={styles.requestCount}>0</p>
                  <p className={styles.requestMsg}>End Points with Faults (past 7 Days)</p>
                </span>
              </div>
            </div>
          </CountBody>
          <CountDetail className={`${styles.countDetail}`} color="#fa3e3e">
            <CountText color="#fa3e3e" className={styles.countText}>
              View Details
            </CountText>
            <CountText color="#fa3e3e" className={styles.countIcon}>
              <i className="fa fa-arrow-right"></i>
            </CountText>
          </CountDetail>
        </Col>
      </Row>
    </div>
  );
}

export default OrderCount;
