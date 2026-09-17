import s from './ModalProjectCard.module.scss';
import { BiLinkExternal } from '@react-icons/all-files/bi/BiLinkExternal';
import { getProject } from '../../../api/content';
import Modal from '../../../components/Modal/Modal';
import Button from '../../../components/UIElements/Button/Button';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useAsync } from '../../../hooks/useAsync';
import { useModal } from '../../../hooks/modalHook';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const ModalProjectCard = () => {
  const { id } = useParams();
  const { data: project, loading } = useAsync(
    () => getProject(id),
    [id],
  );
  const { isVisible, toggleModal } = useModal();

  // Open once the project is loaded so the enter transition plays.
  useEffect(() => {
    if (!loading) toggleModal();
  }, [loading]);

  if (loading) return null;

  return (
    <Modal show={isVisible} onClose={toggleModal}>
      {project ? (
        <div className={s.cardWrapper}>
          <LazyLoadImage
            alt="project-img"
            src={project.image_url}
            effect="blur"
            width="100%"
            wrapperClassName={s.image}
          />

          <div className={s.cardBody}>
            <h3 className={s.title}>{project.title}</h3>

            <div className={s.technologies}>
              {project.technologies.map((tech, index) => (
                <span key={index}>{tech}</span>
              ))}
            </div>
          </div>

          <div className={s.cardFooter}>
            {!!project.site_url && (
              <Button
                style={{ width: '12rem' }}
                className="primary"
                href={project.site_url}
                target="_blank"
              >
                <BiLinkExternal /> &nbsp; View project
              </Button>
            )}

            {!!project.repo_url && (
              <Button
                style={{ width: '12rem' }}
                className="primary"
                href={project.repo_url}
                target="_blank"
              >
                <BiLinkExternal /> &nbsp; Know more
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div className={s.cardBody}>
          <h3 className={s.title}>Project not found</h3>
        </div>
      )}
    </Modal>
  );
};

export default ModalProjectCard;
