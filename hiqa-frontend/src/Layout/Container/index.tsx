import React, { memo } from 'react';
import Head from 'next/head';

import { validateAuthentication } from '@/utils/helpers';

import { ContainerContextProvider } from './context';

type META = {
  title: string;
  description?: string;
};
type Props = {
  header?: boolean | false;
  children: JSX.Element | string | JSX.Element[];
  footer?: boolean | false;
  meta: META;
};
function Container({ children, meta }: Props) {
  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta?.description || 'HIQA'} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="favicon.ico" />
      </Head>
      {validateAuthentication() && (
        <>
          <div className="container">
            <div className="row">
              <div className="col-xl-3 col-lg-4 d-none d-lg-block">
                <div
                  className="sideBarMenus overflow-hidden border-0 customSideNav dnone d-lgblock d-flex flex-column flex-nowrap"
                  id="customSideNav"
                >
                  <div className="sidebarHeader p-2 px-3 border-bottom d-flex align-items-center justify-content-between">
                    <div className="title fw-bold">Menu</div>
                  </div>
                  <div className="sidebarBody flex-fill h-100">
                    <ul className="p-0 m-0 list-unstyled">
                      <li className="sideMenu border-bottom">
                        <a
                          href="#"
                          className="sideMenuLink active text-decoration-none d-flex align-items-center gap-2"
                        >
                          <div className="icon d-flex align-items-center justify-content-center">
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M4 13H10C10.55 13 11 12.55 11 12V4C11 3.45 10.55 3 10 3H4C3.45 3 3 3.45 3 4V12C3 12.55 3.45 13 4 13ZM4 21H10C10.55 21 11 20.55 11 20V16C11 15.45 10.55 15 10 15H4C3.45 15 3 15.45 3 16V20C3 20.55 3.45 21 4 21ZM14 21H20C20.55 21 21 20.55 21 20V12C21 11.45 20.55 11 20 11H14C13.45 11 13 11.45 13 12V20C13 20.55 13.45 21 14 21ZM13 4V8C13 8.55 13.45 9 14 9H20C20.55 9 21 8.55 21 8V4C21 3.45 20.55 3 20 3H14C13.45 3 13 3.45 13 4Z"
                                fill="#125875"
                              />
                            </svg>
                          </div>
                          Dashoard
                        </a>
                      </li>
                      <li className="sideMenu border-bottom">
                        <a href="#" className="sideMenuLink text-decoration-none d-flex align-items-center gap-2">
                          <div className="icon d-flex align-items-center justify-content-center">
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M10.0007 3.3335C10.8847 3.3335 11.7326 3.68469 12.3577 4.30981C12.9828 4.93493 13.334 5.78277 13.334 6.66683C13.334 7.55088 12.9828 8.39873 12.3577 9.02385C11.7326 9.64897 10.8847 10.0002 10.0007 10.0002C9.1166 10.0002 8.26875 9.64897 7.64363 9.02385C7.01851 8.39873 6.66732 7.55088 6.66732 6.66683C6.66732 5.78277 7.01851 4.93493 7.64363 4.30981C8.26875 3.68469 9.1166 3.3335 10.0007 3.3335ZM10.0007 11.6668C13.684 11.6668 16.6673 13.1585 16.6673 15.0002V16.6668H3.33398V15.0002C3.33398 13.1585 6.31732 11.6668 10.0007 11.6668Z"
                                fill="#125875"
                              />
                            </svg>
                          </div>
                          My Profile
                        </a>
                      </li>
                      <li className="sideMenu border-bottom">
                        <a href="#" className="sideMenuLink text-decoration-none d-flex align-items-center gap-2">
                          <div className="icon d-flex align-items-center justify-content-center">
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M10.0096 7.62891C9.42561 7.62891 8.87873 7.85547 8.46467 8.26953C8.05256 8.68359 7.82405 9.23047 7.82405 9.81445C7.82405 10.3984 8.05256 10.9453 8.46467 11.3594C8.87873 11.7715 9.42561 12 10.0096 12C10.5936 12 11.1405 11.7715 11.5545 11.3594C11.9666 10.9453 12.1951 10.3984 12.1951 9.81445C12.1951 9.23047 11.9666 8.68359 11.5545 8.26953C11.3523 8.06574 11.1116 7.90416 10.8463 7.79418C10.5811 7.68421 10.2967 7.62803 10.0096 7.62891ZM18.0623 12.2285L16.785 11.1367C16.8455 10.7656 16.8768 10.3867 16.8768 10.0098C16.8768 9.63281 16.8455 9.25195 16.785 8.88281L18.0623 7.79102C18.1588 7.70841 18.2279 7.59839 18.2603 7.47558C18.2928 7.35278 18.2871 7.223 18.244 7.10352L18.2264 7.05273C17.8749 6.06971 17.3481 5.15851 16.6717 4.36328L16.6365 4.32227C16.5544 4.22569 16.4449 4.15626 16.3226 4.12314C16.2002 4.09002 16.0706 4.09475 15.951 4.13672L14.3651 4.70117C13.7791 4.2207 13.1268 3.8418 12.4197 3.57813L12.1131 1.91992C12.09 1.795 12.0294 1.68008 11.9394 1.59043C11.8494 1.50077 11.7342 1.44062 11.6092 1.41797L11.5565 1.4082C10.5408 1.22461 9.47053 1.22461 8.4549 1.4082L8.40217 1.41797C8.27716 1.44062 8.16201 1.50077 8.072 1.59043C7.98199 1.68008 7.9214 1.795 7.89826 1.91992L7.58967 3.58594C6.88933 3.85171 6.23693 4.2297 5.65803 4.70508L4.06037 4.13672C3.94077 4.09442 3.81114 4.08951 3.68868 4.12266C3.56623 4.1558 3.45676 4.22542 3.37483 4.32227L3.33967 4.36328C2.66446 5.15936 2.13786 6.07033 1.78498 7.05273L1.7674 7.10352C1.67951 7.34766 1.75178 7.62109 1.94905 7.79102L3.24201 8.89453C3.18147 9.26172 3.15217 9.63672 3.15217 10.0078C3.15217 10.3828 3.18147 10.7578 3.24201 11.1211L1.95295 12.2246C1.85646 12.3072 1.7874 12.4172 1.75495 12.54C1.72251 12.6628 1.72821 12.7926 1.77131 12.9121L1.78889 12.9629C2.1424 13.9453 2.66389 14.8535 3.34358 15.6523L3.37873 15.6934C3.46087 15.7899 3.57034 15.8594 3.69272 15.8925C3.8151 15.9256 3.94464 15.9209 4.06428 15.8789L5.66194 15.3105C6.24397 15.7891 6.8924 16.168 7.59358 16.4297L7.90217 18.0957C7.92531 18.2206 7.9859 18.3355 8.07591 18.4252C8.16591 18.5149 8.28107 18.575 8.40608 18.5977L8.45881 18.6074C9.48443 18.792 10.5348 18.792 11.5604 18.6074L11.6131 18.5977C11.7381 18.575 11.8533 18.5149 11.9433 18.4252C12.0333 18.3355 12.0939 18.2206 12.117 18.0957L12.4237 16.4375C13.1307 16.1719 13.783 15.7949 14.369 15.3145L15.9549 15.8789C16.0745 15.9212 16.2041 15.9261 16.3266 15.893C16.449 15.8598 16.5585 15.7902 16.6405 15.6934L16.6756 15.6523C17.3553 14.8496 17.8768 13.9453 18.2303 12.9629L18.2479 12.9121C18.3319 12.6699 18.2596 12.3984 18.0623 12.2285ZM10.0096 13.248C8.11311 13.248 6.576 11.7109 6.576 9.81445C6.576 7.91797 8.11311 6.38086 10.0096 6.38086C11.9061 6.38086 13.4432 7.91797 13.4432 9.81445C13.4432 11.7109 11.9061 13.248 10.0096 13.248Z"
                                fill="#125875"
                              />
                            </svg>
                          </div>
                          Setting
                        </a>
                      </li>
                      <li className="sideMenu border-bottom">
                        <a href="#" className="sideMenuLink text-decoration-none d-flex align-items-center gap-2">
                          <div className="icon d-flex align-items-center justify-content-center">
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M9.99935 18.3332C5.39685 18.3332 1.66602 14.6023 1.66602 9.99984C1.66602 5.39734 5.39685 1.6665 9.99935 1.6665C14.6018 1.6665 18.3327 5.39734 18.3327 9.99984C18.3327 14.6023 14.6018 18.3332 9.99935 18.3332ZM5.83268 9.1665V6.6665L1.66602 9.99984L5.83268 13.3332V10.8332H12.4993V9.1665H5.83268Z"
                                fill="#125875"
                              />
                            </svg>
                          </div>
                          Log Out
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-9 col-lg-8">
                <div className="card profileFormOuter overflowhidden border-0 p-4">
                  <div className="card-header bg-transparent p-0 border-0 pb-4">
                    <div className="pageTitle">{meta.title}</div>
                  </div>
                  {children}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

const IndexContainer = ({ children, header, meta }: Props) => {
  return (
    <ContainerContextProvider>
      <Container {...{ header, meta }}>{children}</Container>
    </ContainerContextProvider>
  );
};
export default memo(IndexContainer);
