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
  onApply: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
  onApply,
}: ArticleParamsFormProps): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [formState, setFormState] = useState<ArticleStateType>(defaultArticleState);
  const formRef = useRef<HTMLElement | null>(null);

  const handleToggle = (): void => {
    setIsOpen((prevState) => !prevState);
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
    if (!isOpen) {
      return;
    }

    const handleOutsideClick = (event: MouseEvent): void => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return (): void => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <>
      <ArrowButton isOpen={isOpen} onClick={handleToggle} />
      <aside
        ref={formRef}
        className={clsx(styles.container, isOpen && styles.container_open)}
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
              onChange={(selected) =>
                setFormState((prevState) => ({
                  ...prevState,
                  fontFamilyOption: selected,
                }))
              }
            />

            <RadioGroup
              name="fontSize"
              title="Размер шрифта"
              options={fontSizeOptions}
              selected={formState.fontSizeOption}
              onChange={(selected) =>
                setFormState((prevState) => ({
                  ...prevState,
                  fontSizeOption: selected,
                }))
              }
            />

            <Select
              title="Цвет шрифта"
              options={fontColors}
              selected={formState.fontColor}
              onChange={(selected) =>
                setFormState((prevState) => ({
                  ...prevState,
                  fontColor: selected,
                }))
              }
            />

            <div className={styles.backgroundBlock}>
              <Separator />

              <Select
                title="Цвет фона"
                options={backgroundColors}
                selected={formState.backgroundColor}
                onChange={(selected) =>
                  setFormState((prevState) => ({
                    ...prevState,
                    backgroundColor: selected,
                  }))
                }
              />
            </div>

            <Select
              title="Ширина контента"
              options={contentWidthArr}
              selected={formState.contentWidth}
              onChange={(selected) =>
                setFormState((prevState) => ({
                  ...prevState,
                  contentWidth: selected,
                }))
              }
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
