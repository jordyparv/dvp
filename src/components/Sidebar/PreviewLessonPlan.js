


// import React, { useState } from 'react';
// import Modal from 'react-modal';
// import { Button, Radio, Table } from 'antd';
// import './PreviewLessonPlan.css';

// const PreviewLessonPlan = ({ isOpen, onRequestClose, data, onSubmit }) => {
//   const [acknowledged, setAcknowledged] = useState(false);

//   const handleAcknowledgeChange = (e) => {
//     setAcknowledged(e.target.value === 'yes');
//   };

//   const handleFinalSubmit = () => {
//     if (acknowledged) {
//       onSubmit();
//     } else {
//       alert('Please acknowledge the module before submitting.');
//     }
//   };

//   const columns = [
//     {
//       title: 'Module',
//       dataIndex: 'module',
//       key: 'module',
//     },
//     {
//       title: 'Module Learning Objective',
//       dataIndex: 'moduleLearningObjective',
//       key: 'moduleLearningObjective',
//     },
//     {
//       title: 'Topic',
//       dataIndex: 'topics',
//       key: 'topics',
//       render: (topics) => (
//         <ul className="table-ul">
//           {topics.map((topic, index) => (
//             <li key={index} className="table-li">
//               <strong>Topic:</strong> {topic.topic}
//               <ul className="table-sub-ul">
//                 {topic.subtopics.map((sub, idx) => (
//                   <li key={idx} className="table-sub-li">
//                     <strong>Subtopic:</strong> {sub.subtopic}, <strong>Learning Objective:</strong> {sub.subtopicLearningObjective}
//                   </li>
//                 ))}
//               </ul>
//             </li>
//           ))}
//         </ul>
//       ),
//     },
//   ];

//   return (
//     <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Preview Modal">
//       <h2>Preview Lesson Plan</h2>
//       <hr />
//       <Table
//         dataSource={data}
//         columns={columns}
//         rowKey={(record, index) => index}
//         pagination={false}
//         className="excel-table"
//       />
//       <hr />
//       <div style={{ marginTop: '20px' }}>
//         <Radio.Group onChange={handleAcknowledgeChange}>
//           <Radio value="yes">I acknowledge this module and understand it can only be edited within 24 hours</Radio>
//         </Radio.Group>
//       </div>
//       <div style={{ marginTop: '20px' }}>
//         <Button type="primary" onClick={handleFinalSubmit} disabled={!acknowledged}>
//           Submit
//         </Button>
//         <Button type="default" onClick={onRequestClose} style={{ marginLeft: '10px' }}>
//           Close
//         </Button>
//       </div>
//     </Modal>
//   );
// };

// export default PreviewLessonPlan;



// import "./PreviewLessonPlan.css";
import React, { useState } from 'react';
import Modal from 'react-modal';
import { Button, Radio, Table } from 'antd';
import './PreviewLessonPlan.css';

const PreviewLessonPlan = ({ isOpen, onRequestClose, data, onSubmit }) => {
  const [acknowledged, setAcknowledged] = useState(false);

  const handleAcknowledgeChange = (e) => {
    setAcknowledged(e.target.value === 'yes');
  };

  const handleFinalSubmit = () => {
    if (acknowledged) {
      onSubmit();
    } else {
      alert('Please acknowledge the module before submitting.');
    }
  };

  const columns = [
    {
      title: 'Module',
      dataIndex: 'module',
      key: 'module',
    },
    {
      title: 'Module Learning Objective',
      dataIndex: 'moduleLearningObjective',
      key: 'moduleLearningObjective',
    },
    {
      title: 'Topic',
      dataIndex: 'topics',
      key: 'topics',
      render: (topics) => (
        <table className="nested-table">
          <tbody>
            {topics.map((topic, index) => (
              <React.Fragment key={index}>
                <tr className="nested-table-row">
                  <td className="nested-table-cell"><strong>Topic:</strong> {topic.topic}</td>
                  <td className="nested-table-cell"></td>
                </tr>
                {topic.subtopics.map((sub, idx) => (
                  <tr key={idx} className="nested-table-row">
                    <td className="nested-table-cell"></td>
                    <td className="nested-table-cell">
                      <strong>Subtopic:</strong> {sub.subtopic}, <strong>Learning Objective:</strong> {sub.subtopicLearningObjective}
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      ),
    },
  ];

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Preview Modal">
      <h2>Preview Lesson Plan</h2>
      <hr />
      <Table
        dataSource={data}
        columns={columns}
        rowKey={(record, index) => index}
        pagination={false}
        className="excel-table"
      />
      <hr />
      <div style={{ marginTop: '20px' }}>
        <Radio.Group onChange={handleAcknowledgeChange}>
          <Radio value="yes">I acknowledge this module and understand it can only be edited within 24 hours</Radio>
        </Radio.Group>
      </div>
      <div style={{ marginTop: '20px' }}>
        <Button type="primary" onClick={handleFinalSubmit} disabled={!acknowledged}>
          Submit
        </Button>
        <Button type="default" onClick={onRequestClose} style={{ marginLeft: '10px' }}>
          Close
        </Button>
      </div>
    </Modal>
  );
};

export default PreviewLessonPlan;


