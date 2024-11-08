import RAPIER from '@dimforge/rapier3d-compat';
import { currentWritable } from '@threlte/core';
import { derived, writable } from 'svelte/store';
import { createPhysicsStages } from './createPhysicsStages';
import { createPhysicsTasks } from './createPhysicsTasks';
export const createRapierContext = (worldArgs, options) => {
    const world = new RAPIER.World(...worldArgs);
    const colliderObjects = new Map();
    const rigidBodyObjects = new Map();
    const rigidBodyEventDispatchers = new Map();
    const colliderEventDispatchers = new Map();
    /**
     * Adds a collider to the context
     * @param collider
     * @param object
     * @param eventDispatcher
     */
    const addColliderToContext = (collider, object, props) => {
        colliderObjects.set(collider.handle, object);
        colliderEventDispatchers.set(collider.handle, props);
    };
    /**
     * Removes the collider from the context
     * @param collider
     */
    const removeColliderFromContext = (collider) => {
        colliderObjects.delete(collider.handle);
        colliderEventDispatchers.delete(collider.handle);
    };
    /**
     * Adds a RigidBody to the context
     * @param rigidBody
     * @param object
     * @param eventDispatcher
     */
    const addRigidBodyToContext = (rigidBody, object, events) => {
        rigidBodyObjects.set(rigidBody.handle, object);
        rigidBodyEventDispatchers.set(rigidBody.handle, events);
    };
    /**
     * Removes the RigidBody from the context
     * @param rigidBody
     */
    const removeRigidBodyFromContext = (rigidBody) => {
        rigidBodyObjects.delete(rigidBody.handle);
        rigidBodyEventDispatchers.delete(rigidBody.handle);
    };
    const framerate = currentWritable(options.framerate ?? 'varying');
    const simulationOffset = currentWritable(1);
    const updateRigidBodySimulationData = currentWritable(framerate.current === 'varying');
    const { simulationStage, synchronizationStage } = createPhysicsStages(framerate, simulationOffset, updateRigidBodySimulationData, options);
    const autostart = options.autoStart ?? true;
    const paused = writable(!autostart);
    if (!autostart) {
        simulationStage.stop();
        synchronizationStage.stop();
    }
    const { simulationTask, synchronizationTask } = createPhysicsTasks(world, framerate, simulationOffset, rigidBodyObjects, updateRigidBodySimulationData, colliderEventDispatchers, rigidBodyEventDispatchers, simulationStage, synchronizationStage);
    return {
        rapier: RAPIER,
        world,
        colliderObjects,
        rigidBodyObjects,
        rigidBodyEventDispatchers,
        colliderEventDispatchers,
        addColliderToContext,
        removeColliderFromContext,
        addRigidBodyToContext,
        removeRigidBodyFromContext,
        debug: writable(false),
        pause: () => {
            paused.set(true);
            simulationStage.stop();
            synchronizationStage.stop();
        },
        resume: () => {
            paused.set(false);
            simulationStage.start();
            synchronizationStage.start();
        },
        paused: derived(paused, (a) => a),
        framerate,
        simulationOffset,
        simulationStage,
        synchronizationStage,
        updateRigidBodySimulationData,
        simulationTask,
        synchronizationTask
    };
};
