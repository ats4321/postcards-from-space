import type { Status } from '../content';
import { useI18n } from '../lib/i18n';

export function StatusPill({ status }: { status: Status }) {
  const { t } = useI18n();
  return (
    <span className="pill" data-status={status}>
      {t(`status.${status}`)}
    </span>
  );
}
