/*
 * DESIGN: "Cyber Trust" - Network Graph Visualization
 * 
 * - Nodes: Professional profiles with glow effects
 * - Edges: Verified connections with animated flow
 * - Colors: Green (verified), Blue (connections), Cyan (hover)
 */

import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  ConnectionMode,
  MarkerType,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useCallback, useMemo } from 'react';
import ProfileNode from './ProfileNode';
import { motion } from 'framer-motion';

// Graph data types
interface ProfileData {
  id: string;
  label: string;
  role: string;
  skills: string[];
  verified: boolean;
}

interface ConnectionData {
  source: string;
  target: string;
  relationship: string;
  project?: string;
  company?: string;
  verified: boolean;
}

interface GraphData {
  nodes: ProfileData[];
  edges: ConnectionData[];
}

// Mock data matching the backend structure
const mockGraphData: GraphData = {
  nodes: [
    {
      id: "lena",
      label: "Lena Garcia",
      role: "Data Engineer",
      skills: ["Python", "FastAPI", "LangChain", "SQL", "AWS"],
      verified: true
    },
    {
      id: "john",
      label: "John Smith",
      role: "Senior ML Engineer",
      skills: ["Python", "PyTorch", "LangChain", "FastAPI"],
      verified: true
    },
    {
      id: "maria",
      label: "Maria Santos",
      role: "Data Architect",
      skills: ["SQL", "Python", "Snowflake", "AWS"],
      verified: true
    },
    {
      id: "alex",
      label: "Alex Chen",
      role: "Full Stack Developer",
      skills: ["React", "TypeScript", "Node.js", "PostgreSQL"],
      verified: true
    },
    {
      id: "sarah",
      label: "Sarah Johnson",
      role: "DevOps Engineer",
      skills: ["Kubernetes", "Docker", "AWS", "Terraform"],
      verified: false
    }
  ],
  edges: [
    {
      source: "lena",
      target: "john",
      relationship: "worked_together",
      project: "EchoDocs",
      verified: true
    },
    {
      source: "lena",
      target: "maria",
      relationship: "worked_together",
      company: "EY Consulting",
      verified: true
    },
    {
      source: "john",
      target: "alex",
      relationship: "collaborated",
      project: "AI Platform",
      verified: true
    },
    {
      source: "maria",
      target: "sarah",
      relationship: "mentored",
      company: "Tech Corp",
      verified: false
    },
    {
      source: "alex",
      target: "sarah",
      relationship: "worked_together",
      project: "Cloud Migration",
      verified: true
    }
  ]
};

// Convert graph data to React Flow format
const convertToFlowNodes = (data: GraphData): Node[] => {
  const positions = [
    { x: 400, y: 100 },
    { x: 150, y: 300 },
    { x: 650, y: 300 },
    { x: 250, y: 500 },
    { x: 550, y: 500 },
  ];

  return data.nodes.map((node, index) => ({
    id: node.id,
    type: 'profileNode',
    position: positions[index] || { x: Math.random() * 600, y: Math.random() * 400 },
    data: {
      label: node.label,
      role: node.role,
      skills: node.skills,
      verified: node.verified,
    },
  }));
};

const convertToFlowEdges = (data: GraphData): Edge[] => {
  return data.edges.map((edge, index) => ({
    id: `e${index}`,
    source: edge.source,
    target: edge.target,
    type: 'smoothstep',
    animated: edge.verified,
    style: {
      stroke: edge.verified ? '#10b981' : '#6b7280',
      strokeWidth: edge.verified ? 3 : 2,
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: edge.verified ? '#10b981' : '#6b7280',
    },
    label: edge.project || edge.company || edge.relationship,
    labelStyle: {
      fill: '#94a3b8',
      fontSize: 11,
      fontWeight: 500,
    },
    labelBgStyle: {
      fill: 'rgba(15, 23, 42, 0.9)',
      fillOpacity: 0.9,
    },
    labelBgPadding: [8, 4] as [number, number],
    labelBgBorderRadius: 4,
  }));
};

// Custom node types
const nodeTypes = {
  profileNode: ProfileNode,
};

interface TrustGraphProps {
  onNodeClick?: (nodeId: string) => void;
}

export default function TrustGraph({ onNodeClick }: TrustGraphProps) {
  const initialNodes = useMemo(() => convertToFlowNodes(mockGraphData), []);
  const initialEdges = useMemo(() => convertToFlowEdges(mockGraphData), []);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const handleNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      if (onNodeClick) {
        onNodeClick(node.id);
      }
    },
    [onNodeClick]
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="w-full h-full"
      style={{ width: '100%', height: '100%' }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={handleNodeClick}
        nodeTypes={nodeTypes}
        connectionMode={ConnectionMode.Loose}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.5}
        maxZoom={2}
        defaultEdgeOptions={{
          type: 'smoothstep',
        }}
        proOptions={{ hideAttribution: true }}
      >
        <Background
          color="#1e3a5f"
          gap={30}
          size={1}
          style={{ backgroundColor: 'transparent' }}
        />
        <Controls
          className="!bg-card/80 !backdrop-blur-sm !border-border !rounded-lg"
          showInteractive={false}
        />
        <MiniMap
          nodeColor={(node) => (node.data?.verified ? '#10b981' : '#6b7280')}
          maskColor="rgba(10, 10, 15, 0.8)"
          className="!bg-card/80 !backdrop-blur-sm !border-border !rounded-lg"
        />
      </ReactFlow>
    </motion.div>
  );
}
