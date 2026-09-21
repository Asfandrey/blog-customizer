import {
  backgroundColors,
  contentWidthArr,
  defaultArticleState,
  fontColors,
  fontFamilyOptions,
  fontSizeOptions,
  type ArticleStateType,
} from '@/constants/articleProps';
import { ArrowButton } from '@/ui/arrow-button';
import { Button } from '@/ui/button';
import { RadioGroup } from '@/ui/radio-group';
import { Select } from '@/ui/select';
import { Separator } from '@/ui/separator';
import { Text } from '@/ui/text';
import { clsx } from 'clsx';
import { useEffect, useRef, useState, type FormEvent } from 'react';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  onApply: (nextArticleState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
  onApply,
}: ArticleParamsFormProps): React.JSX.Element => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [formState, setFormState] = useState<ArticleStateType>(defaultArticleState);

  const sidebarRef = useRef<HTMLElement | null>(null);
  const arrowButtonRef = useRef<HTMLDivElement | null>(null);

  const handleToggle = (): void => {
    setIsSidebarOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleChange =
    <K extends keyof ArticleStateType>(field: K) =>
    (value: ArticleStateType[K]): void => {
      setFormState((prevFormState) => ({
        ...prevFormState,
        [field]: value,
      }));
    };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    onApply(formState);
  };

  const handleReset = (): void => {
    setFormState(defaultArticleState);
    onApply(defaultArticleState);
  };

  useEffect(() => {
    if (!isSidebarOpen) {
      return;
    }

    const handleOutsideClick = (event: MouseEvent): void => {
      if (!(event.target instanceof Node)) {
        return;
      }

      const isOutsideSidebar = !sidebarRef.current?.contains(event.target);

      const isOutsideArrowButton = !arrowButtonRef.current?.contains(event.target);

      if (isOutsideSidebar && isOutsideArrowButton) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return (): void => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isSidebarOpen]);

  return (
    <>
      <ArrowButton
        buttonRef={arrowButtonRef}
        isOpen={isSidebarOpen}
        onClick={handleToggle}
      />

      <aside
        ref={sidebarRef}
        className={clsx(styles.container, isSidebarOpen && styles.container_open)}
      >
        <form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
          <Text as="h2" size={31} weight={800} uppercase>
            Задайте параметры
          </Text>

          <div className={styles.params}>
            <Select
              title="Шрифт"
              options={fontFamilyOptions}
              selected={formState.fontFamilyOption}
              onChange={handleChange('fontFamilyOption')}
            />

            <RadioGroup
              name="fontSize"
              title="Размер шрифта"
              options={fontSizeOptions}
              selected={formState.fontSizeOption}
              onChange={handleChange('fontSizeOption')}
            />

            <Select
              title="Цвет шрифта"
              options={fontColors}
              selected={formState.fontColor}
              onChange={handleChange('fontColor')}
            />

            <div className={styles.backgroundBlock}>
              <Separator />

              <Select
                title="Цвет фона"
                options={backgroundColors}
                selected={formState.backgroundColor}
                onChange={handleChange('backgroundColor')}
              />
            </div>

            <Select
              title="Ширина контента"
              options={contentWidthArr}
              selected={formState.contentWidth}
              onChange={handleChange('contentWidth')}
            />
          </div>

          <div className={styles.bottomContainer}>
            <Button title="Сбросить" htmlType="reset" type="clear" />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </>
  );
};
