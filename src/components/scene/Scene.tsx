import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useThree } from "@react-three/fiber";
import { IFCLoader } from "web-ifc-three/IFCLoader"; 
import {
  acceleratedRaycast,
  computeBoundsTree,
  disposeBoundsTree,
} from "three-mesh-bvh";
import { MeshLambertMaterial } from "three/src/materials/MeshLambertMaterial.js";
import { Vector2 } from "three";
import { IFCModel } from "web-ifc-three/IFC/components/IFCModel";


const preselectMat = new MeshLambertMaterial({
  transparent: true,
  opacity: 0.6,
  color: 0xff88ff,
  depthTest: false,
});

interface SceneProps {
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>
}



export const Scene = ({ canvasRef }: SceneProps) =>  {
  const [model, setModel] = useState<IFCModel>();
  const sceneRef = useRef();

  const ifcLoader = useMemo(() => new IFCLoader(), []);

  const get = useThree((state) => state.get);
  const state = useMemo(() => get(), [get]);

  const cast = useCallback(
    (event: MouseEvent, ifcModel: IFCModel) => {
      const mouse = new Vector2();

      const bounds = canvasRef.current?.getBoundingClientRect();

      if(bounds){
      const x1 = event.clientX - bounds.left;
      const x2 = bounds.right - bounds.left;
      mouse.x = (x1 / x2) * 2 - 1;

      const y1 = event.clientY - bounds.top;
      const y2 = bounds.bottom - bounds.top;
      mouse.y = -(y1 / y2) * 2 + 1;
      }
      state.raycaster.setFromCamera(mouse, state.camera);

      return state.raycaster.intersectObject<IFCModel>(ifcModel);
    },
    [canvasRef, state.camera, state.raycaster]
  );

  const preselectModel = { id: -1 };

  const highlight = (
    event: MouseEvent,
    material: MeshLambertMaterial,
    model: typeof preselectModel,
    ifcModel: IFCModel
  ) => {
    const ifc = ifcLoader.ifcManager;

    const found = cast(event, ifcModel)[0];

    if (found) {
      // Gets model ID
      model.id = found.object.modelID;

      // Gets Express ID
      const index = found.faceIndex;
      const geometry = found.object.geometry;
      const id = ifc.getExpressId(geometry, index || 0);

      // Creates subset
      ifcLoader.ifcManager.createSubset({
        modelID: model.id,
        ids: [id],
        material: material,
        scene: state.scene,
        removePrevious: true,
      });
    } else {
      // Removes previous highlight
      ifc.removeSubset(model.id, material);
    }
  };

  const getItems = async () => {
    ifcLoader.ifcManager.setupThreeMeshBVH(
      computeBoundsTree,
      disposeBoundsTree,
      acceleratedRaycast
    );
  };

  useEffect(() => {
    ifcLoader.load("models/test.ifc", (ifcModel) => {
      setModel(ifcModel);
      getItems();
      window.onmousemove = (event) =>
        highlight(event, preselectMat, preselectModel, ifcModel);
    });
  }, [ifcLoader]);

  return model ?  <primitive ref={sceneRef} object={model} /> : null;
}

export default Scene;