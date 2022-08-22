/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: jetsu (https://sketchfab.com/jetsu)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/man-in-suit-7668c90721144544b3a929edf9eeac9c
title: Man In Suit
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function ManInSuit(props) {
  const { nodes, materials } = useGLTF('/models/man-in-suit/scene.gltf')
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group rotation={[-Math.PI / 2, 0, 0]}>
            <mesh geometry={nodes.man_in_suit_suit_0.geometry} material={materials.suit} />
            <mesh geometry={nodes.man_in_suit_shirt_0.geometry} material={materials.shirt} />
            <mesh geometry={nodes.man_in_suit_tie_0.geometry} material={materials.material} />
            <mesh geometry={nodes.man_in_suit_leather_0.geometry} material={materials.leather} />
            <mesh geometry={nodes.man_in_suit_sole_0.geometry} material={materials.sole} />
            <mesh geometry={nodes.man_in_suit_skin_0.geometry} material={materials.skin} />
            <mesh geometry={nodes['man_in_suit_Material_#128_0'].geometry} material={materials.Material_128} />
            <mesh geometry={nodes.man_in_suit_circle_0.geometry} material={materials.circle} />
            <mesh geometry={nodes.man_in_suit_belt_part_0.geometry} material={materials.belt_part} />
            <mesh geometry={nodes.man_in_suit_button_0.geometry} material={materials.button} />
            <mesh geometry={nodes.man_in_suit_lips_0.geometry} material={materials.lips} />
            <mesh geometry={nodes.man_in_suit_hair_0.geometry} material={materials.hair} />
            <mesh geometry={nodes.man_in_suit_eye_mat3_0.geometry} material={materials.eye_mat3} />
            <mesh geometry={nodes.man_in_suit_eye_mat2_0.geometry} material={materials.eye_mat2} />
            <mesh geometry={nodes.man_in_suit_eye_mat1_0.geometry} material={materials.eye_mat1} />
          </group>
          <group rotation={[-Math.PI / 2, 0, 0]}>
            <mesh geometry={nodes.floor__0.geometry} material={materials.floor__0} />
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/man-in-suit/scene.gltf')
