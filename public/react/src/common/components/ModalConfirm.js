/*
 * @Description: 
 * @Author: tangjiang
 * @Github: 
 * @Date: 2019-12-13 10:28:15
 * @LastEditors: tangjiang
 * @LastEditTime: 2019-12-13 10:37:17
 */
import { Modal } from 'antd';

export function ModalConfirm (
  title, 
  content,
  handleOk,
  handleCancel
) {

  Modal.confirm({
    title,
    content,
    okText: '确定',
    cancelText: '取消',
    onOk () {
      handleOk && handleOk();
    },
    onCancel () {
      handleCancel && handleCancel();
    }
  });
}
