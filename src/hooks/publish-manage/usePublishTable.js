import { useEffect, useState } from 'react';
import { deletePublishData, patchPublishData } from '../../api/publish-manage';

export function usePublishTable(reqFunc) {
  const [dataSource, setDataSource] = useState([]);

  async function newsDel(row) {
    await deletePublishData(row.id);
    refreshData();
  }

  async function newsOffline(row) {
    await patchPublishData(row.id, { data: { publishState: 3 } });
    refreshData();
  }

  async function newsPublish(row) {
    await patchPublishData(row.id, { data: { publishState: 2 } });
    refreshData();
  }

  async function refreshData() {
    const result = await reqFunc();
    setDataSource(result);
  }

  useEffect(() => {
    reqFunc().then(res => {
      setDataSource(res);
    });
  }, []);

  return { dataSource, newsDel, newsOffline, newsPublish };
}
