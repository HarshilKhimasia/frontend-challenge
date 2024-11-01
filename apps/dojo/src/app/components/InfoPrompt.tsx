import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { todoListAtom } from '../recoil/atoms/todoListAtom';

interface InfoPromptProps {
  promptInfoIcon: string;
}

export function InfoPrompt(props: InfoPromptProps) {
  const [todoList] = useRecoilState(todoListAtom);

  const [promptTextState, setPromptTextState] = useState('Loading..');
  const completedTodoArr = todoList.filter((el) => el.isComplete);
  const pendingTodoArr = todoList.filter((el) => !el.isComplete);

  useEffect(() => {
    if (completedTodoArr.length > 0 && pendingTodoArr.length < 1) {
      setPromptTextState(
        'You’re all caught up, but we’ll keep your completed to-dos in case you need to refer back to them.'
      );
    } else if (todoList.length < 1) {
      setPromptTextState(
        'It looks like you don’t have any tasks added yet. Start by adding your first to-do!'
      );
    }
  }, [completedTodoArr.length, pendingTodoArr.length, todoList.length]);
  return (
    <div className="border-solid border-[1.5px] border-slate-300 rounded-xl p-6 ">
      <div className="flex flex-col flex-wrap items-center justify-center">
        <div>
          <img src={props.promptInfoIcon} alt="todoIcon" width={200} />
        </div>
        <div className="pb-8">
          <p>{promptTextState}</p>
        </div>
      </div>
    </div>
  );
}

export default InfoPrompt;
