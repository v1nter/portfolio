import css from './SubMenuItem.module.css';

const prefix = `&#10148;`;

export default function SubMenuItem({ item, menuDispatch }) {
	return (
		<div
			className={css.link}
			onClick={() => menuDispatch({ action: item.title, id: item.id })}
			dangerouslySetInnerHTML={{ __html: `${prefix} ${item.title}` }}
		/>
	);
}
