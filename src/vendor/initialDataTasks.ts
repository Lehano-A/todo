function calcDate(daysToAdd: number) {
  const currentDate = new Date() // Получаем текущую дату
  const resultDate = new Date(currentDate) // Создаём копию
  resultDate.setDate(resultDate.getDate() + daysToAdd) // Добавляем дни

  // Форматируем дату в ДД.ММ.ГГГГ
  const day = String(resultDate.getDate()).padStart(2, '0') // День (добавляем 0, если <10)
  const month = String(resultDate.getMonth() + 1).padStart(2, '0') // Месяц (0-11 → +1)
  const year = resultDate.getFullYear() // Год

  return `${day}.${month}.${year}` // Возвращаем в формате ДД.ММ.ГГГГ
}

export const initialDataTasks = {
  todo: [
    {
      id: '10j',
      nameTask: 'Запланировать отпуск',
      description: 'Выбрать даты, забронировать билеты и отель, составить маршрут путешествия',
      deadline: calcDate(-89),
    },
    {
      id: '1a',
      nameTask: 'Позвонить',
      description: 'Позвонить клиенту',
      deadline: calcDate(15),
    },
    {
      id: '2b',
      nameTask: 'Купить продукты',
      description: 'Молоко, хлеб, яйца, фрукты и овощи для ужина',
      deadline: calcDate(7),
    },
    {
      id: '3c',
      nameTask: 'Прочитать книгу',
      description: "Дочитать 'Мастер и Маргарита' до конца недели, осталось 100 страниц",
      deadline: calcDate(4),
    },
    {
      id: '4d',
      nameTask: 'Подготовить отчёт',
      description: 'Собрать данные за квартал, проанализировать показатели и подготовить презентацию для руководства',
      deadline: calcDate(1),
    },
    {
      id: '5e',
      nameTask: 'Записаться к врачу',
      description: 'Записаться на приём к стоматологу для планового осмотра и чистки зубов',
      deadline: '',
    },
    {
      id: '6f',
      nameTask: 'Починить кран',
      description: 'Купить прокладку и починить капающий кран в ванной',
      deadline: '',
    },
    {
      id: '7g',
      nameTask: 'Сделать зарядку',
      description: 'Утренняя зарядка: 20 минут упражнений',
      deadline: '',
    },
    {
      id: '8h',
      nameTask: 'Написать письмо',
      description: 'Ответить на письма от коллег и партнёров, которые ждут ответа уже несколько дней',
      deadline: calcDate(12),
    },
    {
      id: '9i',
      nameTask: 'Проверить почту',
      description: 'Разобрать входящие письма, ответить на срочные и удалить спам',
      deadline: calcDate(8),
    },
  ],
  inProcess: [
    {
      id: '11k',
      nameTask: 'Изучить React',
      description: 'Пройти курс по React и Redux, сделать практические задания',
      deadline: '',
    },
    {
      id: '12l',
      nameTask: 'Разработать дизайн',
      description: 'Создать макеты для нового сайта компании, согласовать с заказчиком',
      deadline: '',
    },
    {
      id: '13m',
      nameTask: 'Написать код',
      description: 'Реализовать функционал авторизации пользователей на сайте',
      deadline: '',
    },
    {
      id: '14n',
      nameTask: 'Тестирование',
      description: 'Провести тестирование нового функционала, составить отчёт о багах',
      deadline: '',
    },
    {
      id: '15o',
      nameTask: 'Встреча с командой',
      description: 'Обсудить текущие задачи, распределить роли и сроки выполнения',
      deadline: '',
    },
    {
      id: '16p',
      nameTask: 'Обновить резюме',
      description: 'Добавить последние проекты и навыки, загрузить на LinkedIn',
      deadline: '',
    },
    {
      id: '17q',
      nameTask: 'Позвонить родителям',
      description: 'Узнать как дела, договориться о встрече',
      deadline: '',
    },
    {
      id: '18r',
      nameTask: 'Заказать воду',
      description: 'Оформить доставку питьевой воды в офис на следующую неделю',
      deadline: '',
    },
    {
      id: '19s',
      nameTask: 'Помыть машину',
      description: 'Заехать на автомойку по пути домой',
      deadline: '',
    },
    {
      id: '20t',
      nameTask: 'Купить подарок',
      description: 'Выбрать подарок на день рождения друга, упаковать и подписать открытку',
      deadline: '',
    },
  ],
  done: [
    {
      id: '21u',
      nameTask: 'Закончить проект',
      description: 'Завершить все задачи по проекту, сдать заказчику и получить обратную связь',
      deadline: '',
    },
    {
      id: '22v',
      nameTask: 'Оплатить счета',
      description: 'Проверить и оплатить счета за коммунальные услуги, интернет и телефон',
      deadline: '',
    },
    {
      id: '23w',
      nameTask: 'Сходить в магазин',
      description: 'Купить всё необходимое для дома и работы по списку',
      deadline: '',
    },
    {
      id: '24x',
      nameTask: 'Отправить документы',
      description: 'Заполнить и отправить налоговую декларацию до конца месяца',
      deadline: '',
    },
    {
      id: '25y',
      nameTask: 'Провести встречу',
      description: 'Организовать и провести собрание отдела, обсудить результаты и планы',
      deadline: '',
    },
    {
      id: '26z',
      nameTask: 'Записать подкаст',
      description: 'Подготовить материал, записать и смонтировать новый выпуск подкаста',
      deadline: '',
    },
    {
      id: '27aa',
      nameTask: 'Пройти курс',
      description: 'Закончить онлайн-курс по веб-разработке, сдать финальный проект',
      deadline: '',
    },
    {
      id: '28ab',
      nameTask: 'Убраться дома',
      description: 'Пропылесосить, протереть пыль, помыть полы и разобрать вещи',
      deadline: '',
    },
    {
      id: '29ac',
      nameTask: 'Встретиться с другом',
      description: 'Сходить в кафе, обсудить последние новости и планы на будущее',
      deadline: '',
    },
    {
      id: '30ad',
      nameTask: 'Написать статью',
      description: 'Закончить черновик статьи для блога, отправить на проверку редактору',
      deadline: '',
    },
  ],
}
