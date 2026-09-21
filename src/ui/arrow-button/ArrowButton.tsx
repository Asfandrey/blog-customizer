import arrow from '@/images/arrow.svg';
import { clsx } from 'clsx';

import styles from './ArrowButton.module.scss';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

type ArrowButtonProps = {
  isOpen: boolean;
  onClick: OnClick;
  buttonRef?: React.Ref<HTMLDivElement>;
};

export const ArrowButton = ({
  isOpen,
  onClick,
  buttonRef,
}: ArrowButtonProps): React.JSX.Element => {
  return (
    /* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
    <div
      ref={buttonRef}
      role="button"
      aria-label="Открыть/Закрыть форму параметров статьи"
      tabIndex={0}
      className={clsx(styles.container, { [styles.container_open]: isOpen })}
      onClick={onClick}
    >
      <img
        src={arrow}
        alt="иконка стрелочки"
        className={clsx(styles.arrow, { [styles.arrow_open]: isOpen })}
      />
    </div>
  );
};
