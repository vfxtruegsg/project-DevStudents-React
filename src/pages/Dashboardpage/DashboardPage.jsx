import React from 'react';
import { useMediaQuery } from 'react-responsive';
import styles from './DashboardPage.module.css';

import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Stats from './components/Stats';
import Chart from './components/Chart';
import Transactions from './components/Transactions';

const DashboardPage = () => {
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <div className={styles.dashboardContainer}>
      {isDesktop && <Sidebar />}
      <div className={styles.mainContent}>
        <Header />
        <div className={styles.contentGrid}>
          <Stats />
          {isDesktop && <Chart />}
          {(isTablet || isMobile) && <Chart compact />}
          <Transactions />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;