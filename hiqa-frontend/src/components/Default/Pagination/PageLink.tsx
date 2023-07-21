import { HTMLProps } from 'react';
import cn from 'classnames';

export type Props = HTMLProps<HTMLAnchorElement> & { active?: boolean };

export default function PageLink({ className, active, disabled, children, ...otherProps }: Props) {
  const customClassName = cn('page-item', className, {
    active,
    disabled,
  });

  if (disabled) {
    return <span className={customClassName}>{children}</span>;
  }

  return (
    <li className={customClassName}>
      <a aria-current={active ? 'page' : undefined} {...otherProps}>
        {children}
      </a>
    </li>
  );
}
