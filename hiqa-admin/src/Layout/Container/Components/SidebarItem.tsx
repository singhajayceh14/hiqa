import { memo, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface SidebarItemProps {
  title: string;
  url: string;
  iconName: string;
}
const SidebarItem = (props: SidebarItemProps) => {
  const { title, url, iconName } = props;
  const router = useRouter();
  const handelActiveRoute = useMemo(() => {
    return router.pathname.includes(url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, router.pathname]);
  return (
    <li>
      <Link href={url} className={handelActiveRoute ? 'active' : ''}>
        <i className={iconName}></i>
        {title}
      </Link>
    </li>
  );
};
export default memo(SidebarItem);
