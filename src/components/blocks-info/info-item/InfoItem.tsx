import styles from "./info-item.module.css";
import { InfoItemProps } from "./info-item.types";
import { ParameterItem } from "./params-item";

function isVideo(url: string) {
  return (
    url.endsWith(".mp4") ||
    url.endsWith(".webm") ||
    url.endsWith(".ogg") ||
    url.includes("youtube.com") ||
    url.includes("youtu.be")
  );
}

function getYoutubeEmbed(url: string) {
  const short = url.match(/youtu\.be\/([A-Za-z0-9_-]+)/);
  if (short) return `https://www.youtube.com/embed/${short[1]}`;

  const watch = url.match(/[?&]v=([A-Za-z0-9_-]+)/);
  if (watch) return `https://www.youtube.com/embed/${watch[1]}`;

  return null;
}

export function InfoItem({ blockInfo }: InfoItemProps) {
  const typeView = blockInfo.typeView || "v2";
  const typeClass = (styles as Record<string, string>)[typeView] ?? "";
  const paragraphs = blockInfo.description
    ? blockInfo.description.split("\n").filter((p) => p.trim())
    : [];

  const hasMedia = !!blockInfo.media;
  const youtube = hasMedia ? getYoutubeEmbed(blockInfo.media) : null;
  const video = hasMedia && isVideo(blockInfo.media);

  const isSplit = typeView === "v4" || typeView === "v4r";
  const isSpecs = typeView === "v5";

  const Media = hasMedia ? (
    <div className={styles.mediaBox}>
      {youtube ? (
        <iframe
          src={youtube}
          className={styles.media}
          allowFullScreen
          title={blockInfo.title}
        />
      ) : video ? (
        <video className={styles.media} controls>
          <source src={blockInfo.media} />
        </video>
      ) : (
        <img src={blockInfo.media} alt={blockInfo.title} className={styles.media} />
      )}
    </div>
  ) : null;

  if (isSplit) {
    return (
      <section className={`${styles.infoBlock} ${styles[typeView]}`}>
        <div className={styles.split}>
          <div className={styles.textBlock}>
            <h2 className={styles.title}>{blockInfo.title}</h2>

            {paragraphs.length > 0 && (
              <div className={styles.description}>
                {paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            )}

            {blockInfo.params?.length ? (
              <div className={styles.paramsBox}>
                {blockInfo.params.map((param) => (
                  <ParameterItem key={param.id} parameterInfo={param} />
                ))}
              </div>
            ) : null}
          </div>

          <div className={styles.splitMedia}>{Media}</div>
        </div>
      </section>
    );
  }

  return (
    <section className={`${styles.infoBlock} ${styles[typeView]}`}>
      <div className={styles.textBlock}>
        <h2 className={styles.title}>{blockInfo.title}</h2>

        {paragraphs.length > 0 && (
          <div className={styles.description}>
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        )}
      </div>

      {isSpecs ? (
        blockInfo.params?.length ? (
          <div className={styles.specs}>
            {blockInfo.params.map((p) => (
              <div key={p.id} className={styles.specCard}>
                <div className={styles.specValue}>{p.parameter}</div>
                <div className={styles.specName}>{p.name}</div>
              </div>
            ))}
          </div>
        ) : null
      ) : blockInfo.params?.length ? (
        <div className={styles.paramsBox}>
          {blockInfo.params.map((param) => (
            <ParameterItem key={param.id} parameterInfo={param} />
          ))}
        </div>
      ) : null}

      {Media}
    </section>
  );
}
