import { FC, ReactNode } from 'react'
import Button from '../../UI/Button/Button';
import {usePostContext} from '../../../context/posts.context';

interface PostProps {
  children: ReactNode;
  id: string;
  onUpdate: (id: string | null) => void;
}
// Ovako je malo preglednije i ovaj interface mozes da izbacis u './models.d.ts' file
const Post: FC<PostProps> = ({children, id, onUpdate}) => {
// const Post: React.FC<{children: ReactNode, id: string, onUpdate: (id: string | null) => void}> = ({children, id, onUpdate}) => {

  const {remove} = usePostContext();

  const deleteHandler = () => {
    remove(id);
  }

  return (
    <li>
      {children}
      <div>
        <Button onClickHandler={deleteHandler}>Delete</Button>
        <Button onClickHandler={() => onUpdate(id)}>Update</Button>
      </div>
    </li>
  )
}

export default Post